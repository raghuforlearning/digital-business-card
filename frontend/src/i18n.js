import { INTEREST_LABELS_AR } from "./config";

// UI copy — English / Arabic. {name} is filled with the employee's shortName.
export const STRINGS = {
  en: {
    eventTagline: "Let's connect at GISEC",
    saveContact: "Save Contact",
    emailMe: "Email",
    toastVCard: "Contact card ready",
    toastVCardDesc: "Open the downloaded file to add {name} to your contacts.",
    networkingEyebrow: "Networking, made instant",
    letsConnect: "Let's Connect",
    connectSub:
      "Tap a topic you'd like to talk about — your WhatsApp message updates automatically.",
    whatsappRaghu: "WhatsApp {name}",
    topic: "topic",
    topics: "topics",
    clear: "Clear",
    qrEyebrow: "Always one scan away",
    scanToConnect: "Scan to Connect",
    tabLink: "Card Link",
    tabVCard: "Add Contact",
    captionLink: "Opens this digital card",
    captionVCard: "Adds {name} straight to contacts",
    downloadPng: "Download PNG",
    showMyQr: "Show My QR",
    toastQr: "QR code saved",
    toastQrDesc: "Check your downloads folder or gallery.",
    fsqrEyebrow: "Digital business card",
    fsqrCaption: "Scan to Connect",
    saveQrPng: "Save QR PNG",
    saveLockScreen: "Save as Lock Screen",
    toastWallpaper: "Lock-screen QR saved",
    toastWallpaperDesc: "Set it as your wallpaper for hands-free sharing.",
    fsqrHint: "Point the camera at the code — no app needed",
    privacyLine: "No data collected — this card runs entirely in your browser.",
  },
  ar: {
    eventTagline: "لنتواصل في GISEC",
    saveContact: "احفظ جهة الاتصال",
    emailMe: "راسلني",
    toastVCard: "بطاقة جهة الاتصال جاهزة",
    toastVCardDesc: "افتح الملف المُنزّل لإضافة {name} إلى جهات اتصالك.",
    networkingEyebrow: "تواصل فوري",
    letsConnect: "لنتواصل",
    connectSub:
      "اختر موضوعًا تودّ مناقشته — ستُحدَّث رسالة واتساب تلقائيًا.",
    whatsappRaghu: "راسل {name} واتساب",
    topic: "موضوع",
    topics: "مواضيع",
    clear: "مسح",
    qrEyebrow: "على بُعد مسحة واحدة",
    scanToConnect: "امسح للتواصل",
    tabLink: "رابط البطاقة",
    tabVCard: "حفظ جهة الاتصال",
    captionLink: "يفتح هذه البطاقة الرقمية",
    captionVCard: "يضيف {name} مباشرة إلى جهات الاتصال",
    downloadPng: "حفظ PNG",
    showMyQr: "اعرض رمزي",
    toastQr: "تم حفظ رمز QR",
    toastQrDesc: "تحقق من مجلد التنزيلات أو معرض الصور.",
    fsqrEyebrow: "بطاقة أعمال رقمية",
    fsqrCaption: "امسح للتواصل",
    saveQrPng: "حفظ الرمز PNG",
    saveLockScreen: "حفظ كخلفية الشاشة",
    toastWallpaper: "تم حفظ رمز خلفية الشاشة",
    toastWallpaperDesc: "اضبطه كخلفية لمشاركة سهلة في أي وقت.",
    fsqrHint: "وجّه الكاميرا نحو الرمز — لا حاجة لأي تطبيق",
    privacyLine: "لا يتم جمع أي بيانات — تعمل هذه البطاقة بالكامل داخل متصفحك.",
  },
};

// Small translation helper: translate("en", "whatsappRaghu", { name: "Raghu" })
export function translate(lang, key, vars) {
  const dict = STRINGS[lang] || STRINGS.en;
  const template = dict[key] || STRINGS.en[key] || "";
  return template.replace(/\{(\w+)\}/g, (m, k) =>
    vars && vars[k] != null ? String(vars[k]) : m,
  );
}

export function interestLabel(item, lang) {
  if (lang === "ar") return INTEREST_LABELS_AR[item] || item;
  return item;
}

// Localized profile view — English values as fallback
export function profileFor(lang, profile = {}) {
  if (lang === "ar" && (profile.displayNameAr || profile.fullNameAr)) {
    return {
      ...profile,
      fullName: profile.fullNameAr || profile.fullName,
      displayName: profile.displayNameAr || profile.displayName,
      designation: profile.designationAr || profile.designation,
      company: profile.companyAr || profile.company,
      focus: profile.focusAr?.length ? profile.focusAr : profile.focus,
      focusShort: profile.focusShortAr?.length
        ? profile.focusShortAr
        : profile.focusShort,
      shortName: profile.shortNameAr || profile.shortName,
    };
  }
  return profile;
}
