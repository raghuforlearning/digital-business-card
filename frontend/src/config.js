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
  logo: "/nationlabs-logo.png", // the NationLabs logo shown at the top of the card
  initials: "RM",

  // Arabic versions (used by the EN / عربي toggle at the top of the card).
  // Falls back to the English values above when left empty.
  fullNameAr: "راغو نارايانان موهان",
  displayNameAr: "راغو م",
  designationAr: "مهندس أنظمة أول",
  companyAr: "NationLabs للبحوث والتطوير التقني",
  focusAr: [
    "البنية التحتية للمؤسسات",
    "الأمن السيبراني",
    "حلول الذكاء الاصطناعي",
    "هندسة الحلول",
  ],
  focusShortAr: ["البنية التحتية", "الأمن السيبراني", "الذكاء الاصطناعي"],
};

// WhatsApp pre-filled greeting
export const WHATSAPP = {
  greetingEvent: "Hi Raghu, we connected at GISEC.",
  greeting: "Hi Raghu, great to connect with you.",
  greetingEventAr: "مرحبًا راغبو، تواصلنا في GISEC.",
  greetingAr: "مرحبًا راغبو، سعدت بمعرفتك.",
};

// Email pre-filled subject
export const EMAIL = {
  subjectEvent: "Great connecting at GISEC",
  subject: "Great connecting with you",
  subjectEventAr: "سعدت بمعرفتك في GISEC",
  subjectAr: "سعدت بمعرفتك",
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

// Arabic labels for the interest buttons (same order as INTERESTS)
export const INTEREST_LABELS_AR = {
  Cybersecurity: "الأمن السيبراني",
  "AI & Automation": "الذكاء الاصطناعي والأتمتة",
  "Enterprise Infrastructure": "البنية التحتية للمؤسسات",
  "Data Centre": "مراكز البيانات",
  "Virtualization & Cloud": "المحاكاة الافتراضية والسحابة",
  "Government Technology": "تقنيات الحكومة",
  Partnerships: "الشراكات",
};
