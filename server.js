import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const GUESTS_FILE = path.join(__dirname, 'guests.json');
const CREDENTIALS_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(__dirname, 'service-account.json');

// Middleware
app.use(cors());
app.use(express.json());

// Global error handler for malformed JSON
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && 'body' in error) {
    console.error('Invalid JSON payload received');
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  next();
});

// ------------------------------------------------------------------
// DATA SEED
// ------------------------------------------------------------------
const INITIAL_GUESTS = [
  { 
    code: 'GUEST001', 
    groupName: 'Priya Sharma',
    members: [
      { name: 'Priya Sharma', attendance: 'pending', dietaryPreference: 'None', allergies: [], otherAllergies: '', travelMode: '', arrivalDetails: '' }
    ],
    rsvp: null 
  },
  { 
    code: 'GUEST002', 
    groupName: 'Rahul & Anjali',
    members: [
      { name: 'Rahul', attendance: 'pending', dietaryPreference: 'None', allergies: [], otherAllergies: '', travelMode: '', arrivalDetails: '' },
      { name: 'Anjali', attendance: 'pending', dietaryPreference: 'None', allergies: [], otherAllergies: '', travelMode: '', arrivalDetails: '' }
    ],
    rsvp: null 
  },
  { 
    code: 'FAMILY', 
    groupName: 'The Patel Family',
    members: [
      { name: 'Rajesh Patel', attendance: 'attending', dietaryPreference: 'Vegetarian', allergies: [], otherAllergies: '', travelMode: 'Car', arrivalDetails: '' },
      { name: 'Sunita Patel', attendance: 'attending', dietaryPreference: 'Vegetarian', allergies: [], otherAllergies: '', travelMode: 'Car', arrivalDetails: '' }
    ],
    rsvp: {
      message: 'We are so happy for you!',
      relationship: 'Family Member',
      tone: 'Heartfelt',
      updatedAt: new Date().toISOString()
    } 
  }
];

// ------------------------------------------------------------------
// DATABASE INITIALIZATION (Cloud Firestore vs Local File)
// ------------------------------------------------------------------
let db = null;

const initDatabase = async () => {
  // 1. Try connecting to Firestore
  if (fs.existsSync(CREDENTIALS_PATH)) {
    try {
      if (getApps().length === 0) {
        const serviceAccount = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
        initializeApp({
          credential: cert(serviceAccount)
        });
      }
      db = getFirestore();
      console.log('✅ [Cloud] Connected to Google Cloud Firestore.');

      // 2. Auto-Seed Firestore if empty
      const snapshot = await db.collection('guests').limit(1).get();
      if (snapshot.empty) {
        console.log('🌱 [Cloud] Database empty. Seeding initial guests...');
        const batch = db.batch();
        
        INITIAL_GUESTS.forEach(guest => {
          const docRef = db.collection('guests').doc(guest.code); // Use Code as Doc ID
          batch.set(docRef, guest);
        });
        
        await batch.commit();
        console.log('✨ [Cloud] Seeding complete.');
      }
    } catch (error) {
      console.error('⚠️ [Cloud] Failed to connect to Firestore:', error.message);
      db = null;
    }
  } else {
    console.log('ℹ️ [Local] No service-account.json found. Using local JSON file system.');
  }

  // 3. Fallback: Initialize local JSON if Firestore failed or no creds
  if (!db && !fs.existsSync(GUESTS_FILE)) {
    fs.writeFileSync(GUESTS_FILE, JSON.stringify(INITIAL_GUESTS, null, 2));
    console.log('📂 [Local] Created guests.json with seed data.');
  }
};

initDatabase();

// ------------------------------------------------------------------
// HELPER FUNCTIONS (Abstraction Layer)
// ------------------------------------------------------------------

async function getGuestByCode(code) {
  const normalizedCode = code.toUpperCase();

  if (db) {
    // Cloud Fetch
    // We assume Document ID is the Code for O(1) lookup
    const docRef = db.collection('guests').doc(normalizedCode);
    const doc = await docRef.get();
    
    // If not found by ID, try querying the field just in case logic changed
    if (!doc.exists) {
      const querySnapshot = await db.collection('guests').where('code', '==', normalizedCode).limit(1).get();
      if (!querySnapshot.empty) return querySnapshot.docs[0].data();
      return null;
    }
    return doc.data();
  } else {
    // Local Fetch
    const guests = JSON.parse(fs.readFileSync(GUESTS_FILE, 'utf8'));
    return guests.find(g => g.code.toUpperCase() === normalizedCode) || null;
  }
}

async function updateGuestData(code, data) {
  const normalizedCode = code.toUpperCase();

  if (db) {
    // Cloud Update
    const docRef = db.collection('guests').doc(normalizedCode);
    // Check existence first to avoid creating orphans if logic is loose
    const doc = await docRef.get();
    
    if (doc.exists) {
        await docRef.update(data);
        return { ...doc.data(), ...data };
    } else {
        // Fallback query update
        const querySnapshot = await db.collection('guests').where('code', '==', normalizedCode).limit(1).get();
        if (!querySnapshot.empty) {
            await querySnapshot.docs[0].ref.update(data);
            return { ...querySnapshot.docs[0].data(), ...data };
        }
        throw new Error('Guest not found');
    }
  } else {
    // Local Update
    const guests = JSON.parse(fs.readFileSync(GUESTS_FILE, 'utf8'));
    const index = guests.findIndex(g => g.code.toUpperCase() === normalizedCode);

    if (index !== -1) {
      guests[index] = { ...guests[index], ...data };
      fs.writeFileSync(GUESTS_FILE, JSON.stringify(guests, null, 2));
      return guests[index];
    }
    throw new Error('Guest not found');
  }
}

const isValidMember = (member) => {
  if (!member || typeof member !== 'object') return false;

  const { name, attendance, dietaryPreference, allergies, otherAllergies, travelMode, arrivalDetails } = member;
  const hasValidName = typeof name === 'string' && name.trim().length > 0;
  const hasValidAttendance = ['pending', 'attending', 'not_attending'].includes(attendance);
  const hasValidDiet = typeof dietaryPreference === 'string';
  const hasValidAllergies = Array.isArray(allergies) && allergies.every((a) => typeof a === 'string');
  const hasValidOtherAllergies = typeof otherAllergies === 'string';
  const hasValidTravel = typeof travelMode === 'string';
  const hasValidArrival = typeof arrivalDetails === 'string';

  return (
    hasValidName &&
    hasValidAttendance &&
    hasValidDiet &&
    hasValidAllergies &&
    hasValidOtherAllergies &&
    hasValidTravel &&
    hasValidArrival
  );
};

const validateRsvpPayload = (members, rsvp) => {
  if (!Array.isArray(members) || members.length === 0) {
    return 'Members array is required and cannot be empty';
  }

  const invalidMember = members.find((member) => !isValidMember(member));
  if (invalidMember) {
    return 'Each member must include name, attendance, dietary preference, allergy details, and travel details';
  }

  if (rsvp && typeof rsvp !== 'object') {
    return 'RSVP details must be an object';
  }

  if (rsvp) {
    const { message, relationship, tone } = rsvp;
    const messageOk = message === undefined || typeof message === 'string';
    const relationshipOk = relationship === undefined || typeof relationship === 'string';
    const toneOk = tone === undefined || typeof tone === 'string';

    if (!messageOk || !relationshipOk || !toneOk) {
      return 'RSVP message, relationship, and tone must be strings when provided';
    }
  }

  return null;
};

// ------------------------------------------------------------------
// API ROUTES
// ------------------------------------------------------------------

// Get Guest by Code
app.get('/api/guest/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const guest = await getGuestByCode(code);

    if (guest) {
      res.json(guest);
    } else {
      res.status(404).json({ error: 'Invalid invitation code' });
    }
  } catch (error) {
    console.error('Error fetching guest:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update RSVP for a specific Guest Code
app.post('/api/guest/:code/rsvp', async (req, res) => {
  try {
    const { code } = req.params;
    const { members, rsvp } = req.body;

    const validationError = validateRsvpPayload(members, rsvp);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Construct update object
    const sanitizedMembers = members.map((member) => ({
      name: member.name.trim(),
      attendance: member.attendance,
      dietaryPreference: member.dietaryPreference.trim(),
      allergies: member.allergies.map((allergy) => allergy.trim()).filter(Boolean),
      otherAllergies: member.otherAllergies.trim(),
      travelMode: member.travelMode.trim(),
      arrivalDetails: member.arrivalDetails.trim()
    }));

    const sanitizedRsvp = rsvp
      ? {
          ...(rsvp.message !== undefined ? { message: rsvp.message?.trim() ?? '' } : {}),
          ...(rsvp.relationship !== undefined ? { relationship: rsvp.relationship?.trim() ?? '' } : {}),
          ...(rsvp.tone !== undefined ? { tone: rsvp.tone?.trim() ?? '' } : {}),
          updatedAt: new Date().toISOString()
        }
      : null;

    const updatePayload = {
        members: sanitizedMembers
    };

    if (sanitizedRsvp) {
      updatePayload.rsvp = sanitizedRsvp;
    }

    const updatedGuest = await updateGuestData(code, updatePayload);
    
    console.log(`[RSVP] Updated entry for code ${code} via ${db ? 'Cloud Firestore' : 'Local File'}`);
    res.json({ success: true, guest: updatedGuest });

  } catch (error) {
    console.error('Error updating RSVP:', error);
    if (error.message === 'Guest not found') {
        res.status(404).json({ error: 'Guest not found' });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Fallback for generic RSVPs
app.post('/api/rsvp', (req, res) => {
  console.log('[RSVP] Generic submission received (No Persistence):', req.body);
  res.json({ success: true });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`-----------------------------------------------------`);
  console.log(`To enable Google Cloud Persistence:`);
  console.log(`1. Create a Firestore database in GCP console.`);
  console.log(`2. Download service account key.`);
  console.log(`3. Save as 'service-account.json' in this folder.`);
  console.log(`-----------------------------------------------------\n`);
});