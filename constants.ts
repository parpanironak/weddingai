
import { SectionId, SectionData, ScheduleEvent, FaqItem, RegistryItem } from './types';

export const SECTIONS: SectionData[] = [
  {
    id: SectionId.WELCOME,
    title: "Welcome",
    subtitle: "A Celebration of Love",
    backgroundImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop", 
    backgroundVideo: "https://cdn.pixabay.com/video/2025/01/26/254787_large.mp4" 
  },
  {
    id: SectionId.SCHEDULE,
    title: "Program",
    subtitle: "Ceremony & Celebration",
    backgroundImage: "https://images.unsplash.com/photo-1497290756760-23ac55edf0d6?q=80&w=1950&auto=format&fit=crop", 
    backgroundVideo: "https://cdn.pixabay.com/video/2025/01/26/254787_large.mp4"
  },
  {
    id: SectionId.RSVP,
    title: "Guest Details",
    subtitle: "Please RSPV by Mar 31st",
    backgroundImage: "https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=1974&auto=format&fit=crop",
    backgroundVideo: "https://cdn.pixabay.com/video/2025/01/26/254787_large.mp4" 
  },
  {
    id: SectionId.FAQ,
    title: "Details",
    subtitle: "Guest Information",
    backgroundImage: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2068&auto=format&fit=crop", 
    backgroundVideo: "https://cdn.pixabay.com/video/2025/01/26/254787_large.mp4"
  }
];

export const SCHEDULE: ScheduleEvent[] = [
  {
    time: "Oct 23 - 7:00 PM",
    title: "Welcome Cocktail",
    description: "Kickstarting the celebrations with an elegant evening of cocktails and conversation.",
    location: "Skydeck Lounge",
    icon: "glass",
    dressCode: "Cocktail Chic",
    dressCodeDescription: "Suits, Evening Gowns, and effortless glamour.",
    dressCodeImage: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?q=80&w=2070&auto=format&fit=crop",
    pinterestLinkMen: "https://www.pinterest.com/ronak47/my-wedding-board/",
    pinterestLinkWomen: "https://www.pinterest.com/ronak47/unique-bridal-jewelry/",
    googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58041.883059430926!2d73.65088462829591!3d24.602386892957355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5ead3e3d2d1%3A0x957c469e27a6755d!2sOm%20Glass%20Decor!5e0!3m2!1sen!2sin!4v1767201583717!5m2!1sen!2sin"
  },
  {
    time: "Oct 24 - 12:00 PM",
    title: "Guest Check-in",
    description: "Welcome to Udaipur! Please check in at the main lobby and refresh before the festivities.",
    location: "Hotel Lobby",
    icon: "key",
    dressCode: "Travel Casual",
    dressCodeDescription: "Comfortable travel wear.",
    dressCodeImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    pinterestLinkMen: "",
    pinterestLinkWomen: "",
    googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58041.883059430926!2d73.65088462829591!3d24.602386892957355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5ead3e3d2d1%3A0x957c469e27a6755d!2sOm%20Glass%20Decor!5e0!3m2!1sen!2sin!4v1767201583717!5m2!1sen!2sin",
    isLogistics: true
  },
  {
    time: "Oct 24 - 4:00 PM",
    title: "Sangeet Night",
    description: "An intimate evening of music, acoustic melodies, and shared stories.",
    location: "The Glass House",
    icon: "music",
    dressCode: "Indo-Western Glam",
    dressCodeDescription: "Sparkles, Lehengas, or Cocktail Attire.",
    dressCodeImage: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=2070&auto=format&fit=crop",
    pinterestLinkMen: "https://www.pinterest.com/ronak47/my-wedding-board/",
    pinterestLinkWomen: "https://www.pinterest.com/ronak47/unique-bridal-jewelry/",
    googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58041.883059430926!2d73.65088462829591!3d24.602386892957355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5ead3e3d2d1%3A0x957c469e27a6755d!2sOm%20Glass%20Decor!5e0!3m2!1sen!2sin!4v1767201583717!5m2!1sen!2sin"

  },
  {
    time: "Oct 25 - 10:00 AM",
    title: "Haldi Ceremony",
    description: "A traditional ceremony to bless the couple with turmeric and love.",
    location: "Garden Terrace",
    icon: "sun",
    dressCode: "Shades of Yellow",
    dressCodeDescription: "Light Kurta Pajamas, Yellow Sarees or Sundresses.",
    dressCodeImage: "https://images.unsplash.com/photo-1604605949649-6a3074092437?q=80&w=2000&auto=format&fit=crop",
    pinterestLinkMen: "https://www.pinterest.com/ronak47/my-wedding-board/",
    pinterestLinkWomen: "https://www.pinterest.com/ronak47/unique-bridal-jewelry/",
    googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58041.883059430926!2d73.65088462829591!3d24.602386892957355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5ead3e3d2d1%3A0x957c469e27a6755d!2sOm%20Glass%20Decor!5e0!3m2!1sen!2sin!4v1767201583717!5m2!1sen!2sin"
  },
  {
    time: "Oct 25 - 7:00 PM",
    title: "The Wedding",
    description: "The Varmala and Pheras followed by a seated dinner.",
    location: "Lakeside Pavilion",
    icon: "heart",
    dressCode: "Formal Traditional",
    dressCodeDescription: "Sherwanis, Silk Sarees, or Formal Suits.",
    dressCodeImage: "https://images.unsplash.com/photo-1583934555053-9f830d082531?q=80&w=2070&auto=format&fit=crop",
    pinterestLinkMen: "https://www.pinterest.com/ronak47/my-wedding-board/",
    pinterestLinkWomen: "https://www.pinterest.com/ronak47/unique-bridal-jewelry/",
    googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58041.883059430926!2d73.65088462829591!3d24.602386892957355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5ead3e3d2d1%3A0x957c469e27a6755d!2sOm%20Glass%20Decor!5e0!3m2!1sen!2sin!4v1767201583717!5m2!1sen!2sin"
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the dress code?",
    answer: "Formal or Traditional Indian attire. We love a palette of pastels, creams, and earthy tones to match the setting."
  },
  {
    question: "Are children welcome?",
    answer: "To ensure a relaxing evening for everyone, the reception will be an adults-only occasion."
  },
  {
    question: "Is there parking available?",
    answer: "Valet parking is available at the main entrance of the venue."
  }
];

export const REGISTRY_ITEMS: RegistryItem[] = [
  {
    store: "The Couple's Fund",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop",
    url: "#"
  },
  {
    store: "Home & Living",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f98059?q=80&w=1964&auto=format&fit=crop",
    url: "#"
  },
  {
    store: "Travel Adventures",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
    url: "#"
  }
];