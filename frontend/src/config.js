// ============================================================
//  RAGHU M — DIGITAL BUSINESS CARD · CENTRAL CONFIGURATION
//  Edit your details here. The whole page, the QR codes and the
//  downloaded vCard update automatically. No other file to touch.
// ============================================================

// EVENT MODE — switch to false after the event.
//   true  -> shows the "GISEC 2026" badge + "Let's connect at GISEC"
//            and prefills "Hi Raghu, we connected at GISEC." on WhatsApp
//   false -> normal digital business card, no event branding anywhere
export const EVENT_MODE = true;

export const EVENT = {
  badge: "GISEC 2026",
  tagline: "Let's connect at GISEC",
};

export const PROFILE = {
  fullName: "Raghu Narayanan Mohan", // used inside the downloaded vCard
  displayName: "Raghu M", // shown as the big name on the card
  designation: "Senior Systems Engineer",
  company: "NationLabs Technical Research & Development",
  phoneDisplay: "+971 50 991 5272", // how the number is shown on screen
  phoneRaw: "+971509915272", // used for tel: links and the vCard
  whatsappNumber: "971509915272", // country code + number, no "+" and no spaces
  email: "raghu.m@nationlabs.ae",
  linkedin: "https://www.linkedin.com/in/raghunarayanan-mohan/",

  // Professional focus — shown under your name and saved into the vCard
  focus: [
    "Enterprise Infrastructure",
    "Cybersecurity",
    "AI Solutions",
    "Solution Architecture",
  ],

  // Short version used on the full-screen QR view
  focusShort: ["Infrastructure", "Cybersecurity", "AI"],

  // Add a URL (or put "profile.jpg" in the public folder and write "/profile.jpg")
  // to replace the "RM" initials with your photo.
  photo: "",
  initials: "RM",
};

// WhatsApp pre-filled greeting
export const WHATSAPP = {
  greetingEvent: "Hi Raghu, we connected at GISEC.",
  greeting: "Hi Raghu, great to connect with you.",
};

// Email pre-filled subject
export const EMAIL = {
  subjectEvent: "Great connecting at GISEC",
  subject: "Great connecting with you",
};

// "Let's Connect" quick-interest buttons
export const INTERESTS = [
  "Cybersecurity",
  "AI & Automation",
  "Enterprise Infrastructure",
  "Data Centre",
  "Virtualization & Cloud",
  "Government Technology",
  "Partnerships",
];
