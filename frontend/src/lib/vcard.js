import { EVENT_MODE, WHATSAPP, EMAIL } from "../config";
import { EMPLOYEES } from "../employees";

const escapeVCard = (s = "") =>
  s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");

// vCard 3.0 — opens natively on Android and iPhone ("Add to Contacts")
export function buildVCard(p) {
  const words = p.fullName.trim().split(/\s+/);
  const lastName = escapeVCard(words[words.length - 1] || "");
  const firstNames = escapeVCard(words.slice(0, -1).join(" "));
  const rev = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${lastName};${firstNames};;;`,
    `FN:${escapeVCard(p.fullName)}`,
    `ORG:${escapeVCard(p.company)}`,
    `TITLE:${escapeVCard(p.designation)}`,
    `TEL;TYPE=CELL,VOICE:${p.phoneRaw}`,
    `EMAIL;TYPE=INTERNET:${p.email}`,
    `URL:${p.linkedin}`,
    `NOTE:${escapeVCard(p.focus.join(" | "))}`,
    `REV:${rev}`,
    "END:VCARD",
  ];
  return lines.join("\r\n");
}

export function downloadVCard(p) {
  const blob = new Blob([buildVCard(p)], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${p.fullName.replace(/\s+/g, "-")}.vcf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function baseGreeting(p, lang) {
  const ar = lang === "ar";
  const name = ar ? p.shortNameAr || p.shortName : p.shortName;
  const tpl = ar
    ? EVENT_MODE
      ? WHATSAPP.greetingEventAr
      : WHATSAPP.greetingAr
    : EVENT_MODE
      ? WHATSAPP.greetingEvent
      : WHATSAPP.greeting;
  return tpl.replace("{name}", name);
}

export function whatsappMessage(interests = [], lang = "en", p) {
  const base = baseGreeting(p, lang);
  if (!interests.length) return base;
  if (lang === "ar") {
    const list = interests.map((t, i) => (i === 0 ? t : `و${t}`)).join(" ");
    return `${base} مهتم بـ${list}.`;
  }
  return `${base} Interested in ${interests.join(", ")}.`;
}

export function buildWhatsAppLink(interests = [], lang = "en", p) {
  return `https://wa.me/${p.whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage(interests, lang, p),
  )}`;
}

export function buildEmailLink(interests = [], lang = "en", p) {
  const ar = lang === "ar";
  const subject = ar
    ? EVENT_MODE
      ? EMAIL.subjectEventAr
      : EMAIL.subjectAr
    : EVENT_MODE
      ? EMAIL.subjectEvent
      : EMAIL.subject;
  return `mailto:${p.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(whatsappMessage(interests, lang, p))}`;
}

// The QR points at this person's permanent URL on whatever domain
// is hosting the card: /raghu when path-based, ?u=raghu otherwise.
export function cardUrl(profileId) {
  if (typeof window === "undefined") return "";
  const ids = EMPLOYEES.map((e) => e.id);
  const seg = window.location.pathname.split("/").filter(Boolean).pop();
  if (seg && ids.includes(seg)) {
    return window.location.origin + window.location.pathname;
  }
  return `${window.location.origin}/?u=${encodeURIComponent(profileId)}`;
}

export function downloadCanvasPng(canvas, filename) {
  if (!canvas) return;
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
