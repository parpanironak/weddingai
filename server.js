import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const GUESTS_FILE = path.join(__dirname, 'guests.json');

// Middleware
app.use(cors());
app.use(express.json());

// Seed Data for Testing
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

// Initialize JSON DB if it doesn't exist
if (!fs.existsSync(GUESTS_FILE)) {
  fs.writeFileSync(GUESTS_FILE, JSON.stringify(INITIAL_GUESTS, null, 2));
  console.log('[DB] Created guests.json with seed data.');
}

// API Routes

// Get Guest by Code
app.get('/api/guest/:code', (req, res) => {
  try {
    const { code } = req.params;
    const guests = JSON.parse(fs.readFileSync(GUESTS_FILE, 'utf8'));
    
    // Case-insensitive code match
    const guest = guests.find(g => g.code.toUpperCase() === code.toUpperCase());

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
app.post('/api/guest/:code/rsvp', (req, res) => {
  try {
    const { code } = req.params;
    const { members, rsvp } = req.body; 

    const guests = JSON.parse(fs.readFileSync(GUESTS_FILE, 'utf8'));
    const index = guests.findIndex(g => g.code.toUpperCase() === code.toUpperCase());

    if (index !== -1) {
      // Update the guest's data
      guests[index].members = members;
      guests[index].rsvp = {
        ...rsvp,
        updatedAt: new Date().toISOString()
      };
      
      fs.writeFileSync(GUESTS_FILE, JSON.stringify(guests, null, 2));
      console.log(`[RSVP] Updated entry for code ${code}`);
      res.json({ success: true, guest: guests[index] });
    } else {
      res.status(404).json({ error: 'Guest not found' });
    }
  } catch (error) {
    console.error('Error updating RSVP:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fallback for generic RSVPs (Legacy/No Code)
app.post('/api/rsvp', (req, res) => {
  console.log('[RSVP] Generic submission received:', req.body);
  res.json({ success: true });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Test URLs:`);
  console.log(`  http://localhost:5173/?code=GUEST001`);
  console.log(`  http://localhost:5173/?code=GUEST002`);
  console.log(`  http://localhost:5173/?code=FAMILY`);
});
