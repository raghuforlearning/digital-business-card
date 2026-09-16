// ============================================================
//  GLOBAL SETTINGS — shared by every employee card
//  Personal details (name, phone, photo, LinkedIn...) live in
//  src/employees.js — one block per person.
// ============================================================

// EVENT MODE — switch to false after the event.
//   true  -> shows the "GISEC 2026" badge + "Let's connect at GISEC"
//            and prefills "Hi <name>, we connected at GISEC." on WhatsApp
//   false -> normal digital business card, no event branding anywhere
export const EVENT_MODE = true;

export const EVENT = {
  badge: "GISEC 2026", // the text on the badge; hide it all with EVENT_MODE
};

// WhatsApp pre-filled greeting — {name} is replaced by the employee's
// shortName (from src/employees.js)
export const WHATSAPP = {
  greetingEvent: "Hi {name}, we connected at GISEC.",
  greeting: "Hi {name}, great to connect with you.",
  greetingEventAr: "مرحبًا {name}، تواصلنا في GISEC.",
  greetingAr: "مرحبًا {name}، سعدت بمعرفتك.",
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
