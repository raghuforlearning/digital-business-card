// ============================================================
//  TEAM DIRECTORY — one card design, every employee
//  Each person gets their own URL:
//    https://your-domain.com/?u=raghu      (works on every host)
//    https://your-domain.com/raghu         (needs the rewrite rules
//        already included: .htaccess / _redirects / vercel.json)
//  The QR code on each card automatically points to that person's URL.
//  To add an employee: copy the template block below, fill it in, and drop
//  their photo into the public/ folder. Deploy again — done.
// ============================================================

export const EMPLOYEES = [
  {
    id: "raghu", // used in the URL: ?u=raghu or /raghu
    shortName: "Raghu", // used in pre-filled messages: "Hi Raghu, ..."
    shortNameAr: "راغبو",
    fullName: "Raghu Narayanan Mohan", // used inside the downloaded vCard
    fullNameAr: "راغو نارايانان موهان",
    displayName: "Raghu M", // the big name on the card
    displayNameAr: "راغو م",
    designation: "Senior Systems Engineer",
    designationAr: "مهندس أنظمة أول",
    company: "NationLabs Technical Research & Development",
    companyAr: "NationLabs للبحوث والتطوير التقني",
    phoneDisplay: "+971 50 991 5272", // how the number is shown on screen
    phoneRaw: "+971509915272", // used for tel: links and the vCard
    whatsappNumber: "971509915272", // digits only, with country code
    email: "raghu.m@nationlabs.ae",
    linkedin: "https://www.linkedin.com/in/raghunarayanan-mohan/",
    focus: [
      "Enterprise Infrastructure",
      "Cybersecurity",
      "AI Solutions",
      "Solution Architecture",
    ],
    focusAr: [
      "البنية التحتية للمؤسسات",
      "الأمن السيبراني",
      "حلول الذكاء الاصطناعي",
      "هندسة الحلول",
    ],
    focusShort: ["Infrastructure", "Cybersecurity", "AI"],
    focusShortAr: ["البنية التحتية", "الأمن السيبراني", "الذكاء الاصطناعي"],
    photo: "/profile.jpg", // their headshot in public/ — "" shows the initials
    initials: "RM",
    logo: "/nationlabs-logo.png",
  },

  // ---- TEMPLATE: copy this block for each new employee ----
  // {
  //   id: "sara",                       // -> ?u=sara or /sara
  //   shortName: "Sara",
  //   shortNameAr: "سارة",
  //   fullName: "Sara Al Mansouri",
  //   fullNameAr: "سارة المنصوري",
  //   displayName: "Sara A",
  //   displayNameAr: "سارة م",
  //   designation: "Security Consultant",
  //   designationAr: "مستشارة أمن سيبراني",
  //   company: "NationLabs Technical Research & Development",
  //   companyAr: "NationLabs للبحوث والتطوير التقني",
  //   phoneDisplay: "+971 50 000 0000",
  //   phoneRaw: "+971500000000",
  //   whatsappNumber: "971500000000",
  //   email: "sara@nationlabs.ae",
  //   linkedin: "https://www.linkedin.com/in/username/",
  //   focus: ["Cybersecurity", "Cloud"],
  //   focusAr: ["الأمن السيبراني", "السحابة"],
  //   focusShort: ["Security", "Cloud"],
  //   focusShortAr: ["الأمن", "السحابة"],
  //   photo: "/sara.jpg",               // put sara.jpg in public/
  //   initials: "SA",
  //   logo: "/nationlabs-logo.png",
  // },
];

// The card shown when the URL has no employee in it
export const DEFAULT_PROFILE_ID = "raghu";

// Reads the employee id from the URL: ?u=raghu first, then /raghu
export function resolveProfileId() {
  if (typeof window === "undefined") return DEFAULT_PROFILE_ID;
  const ids = EMPLOYEES.map((e) => e.id);
  const q = new URLSearchParams(window.location.search).get("u");
  if (q && ids.includes(q)) return q;
  const seg = window.location.pathname.split("/").filter(Boolean).pop();
  if (seg && ids.includes(seg)) return seg;
  return DEFAULT_PROFILE_ID;
}
