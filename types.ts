
export enum SectionId {
  WELCOME = 'welcome',
  SCHEDULE = 'schedule',
  RSVP = 'rsvp',
  FAQ = 'faq'
}

export interface SectionData {
  id: SectionId;
  title: string;
  subtitle: string;
  backgroundImage: string;
  backgroundVideo?: string;
}

export interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  location: string;
  icon: string;
  // New Dress Code fields
  dressCode: string;
  dressCodeDescription: string;
  dressCodeImage: string;
  pinterestLinkMen: string;   // Updated
  pinterestLinkWomen: string; // Updated
  googleMapLink?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RegistryItem {
  store: string;
  image: string;
  url?: string;
}

export interface GuestMember {
  name: string;
  attendance: 'attending' | 'declining' | 'pending';
  dietaryPreference?: 'Vegetarian' | 'Vegan' | 'Jain' | 'None' | '';
  allergies?: string[];
  otherAllergies?: string;
  
  // Travel Details
  isOutOfTown?: boolean;
  travelMode?: 'Flight' | 'Train' | 'Car' | 'Local' | '';
  transportNumber?: string; // Flight No or Train No
  arrivalDate?: string; // Date string
  arrivalTime?: string; // Time string
  arrivalDetails?: string; // General notes if needed
}

export interface GuestRSVP {
  message: string;
  relationship?: string; // Optional (AI removed)
  tone?: string; // Optional (AI removed)
  updatedAt?: string;
}

export interface Guest {
  code: string;
  groupName: string; // Display name for the Welcome screen (e.g., "Rahul & Anjali")
  members: GuestMember[];
  rsvp: GuestRSVP | null;
}