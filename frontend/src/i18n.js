import { PROFILE, INTEREST_LABELS_AR } from "./config";

// UI copy — English / Arabic
export const STRINGS = {
  en: {
    eventTagline: "Let's connect at GISEC",
    saveContact: "Save Contact",
    toastVCard: "Contact card ready",
    toastVCardDesc: "Open the downloaded file to add Raghu to your contacts.",
    networkingEyebrow: "Networking, made instant",
    letsConnect: "Let's Connect",
    connectSub:
      "Tap a topic you'd like to talk about — your WhatsApp message updates automatically.",
    whatsappRaghu: "WhatsApp Raghu",
    topic: "topic",
    topics: "topics",
    clear: "Clear",
    qrEyebrow: "Always one scan away",
    scanToConnect: "Scan to Connect",
    tabLink: "Card Link",
    tabVCard: "Add Contact",
    captionLink: "Opens this digital card",
    captionVCard: "Adds Raghu straight to contacts",
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
  },
  ar: {
    eventTagline: "لنتواصل في GISEC",
    saveContact: "احفظ جهة الاتصال",
    toastVCard: "بطاقة جهة الاتصال جاهزة",
    toastVCardDesc: "افتح الملف المُنزّل لإضافة راغبو إلى جهات اتصالك.",
    networkingEyebrow: "تواصل فوري",
    letsConnect: "لنتواصل",
    connectSub:
      "اختر موضوعًا تودّ مناقشته — ستُحدَّث رسالة واتساب تلقائيًا.",
    whatsappRaghu: "راسل راغبو واتساب",
    topic: "موضوع",
    topics: "مواضيع",
    clear: "مسح",
    qrEyebrow: "على بُعد مسحة واحدة",
    scanToConnect: "امسح للتواصل",
    tabLink: "رابط البطاقة",
    tabVCard: "حفظ جهة الاتصال",
    captionLink: "يفتح هذه البطاقة الرقمية",
    captionVCard: "يضيف راغبو مباشرة إلى جهات الاتصال",
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
  },
};

export function interestLabel(item, lang) {
  if (lang === "ar") return INTEREST_LABELS_AR[item] || item;
  return item;
}

// Localized profile view — English values as fallback
export function profileFor(lang) {
  if (lang === "ar" && PROFILE.displayNameAr) {
    return {
      ...PROFILE,
      fullName: PROFILE.fullNameAr || PROFILE.fullName,
      displayName: PROFILE.displayNameAr,
      designation: PROFILE.designationAr || PROFILE.designation,
      company: PROFILE.companyAr || PROFILE.company,
      focus: PROFILE.focusAr?.length ? PROFILE.focusAr : PROFILE.focus,
      focusShort: PROFILE.focusShortAr?.length
        ? PROFILE.focusShortAr
        : PROFILE.focusShort,
    };
  }
  return PROFILE;
}
