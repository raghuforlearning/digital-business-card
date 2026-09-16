import { PROFILE, EVENT_MODE, WHATSAPP, EMAIL } from "../config";

const escapeVCard = (s = "") =>
  s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");

// vCard 3.0 — opens natively on Android and iPhone ("Add to Contacts")
export function buildVCard() {
  const words = PROFILE.fullName.trim().split(/\s+/);
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
    `FN:${escapeVCard(PROFILE.fullName)}`,
    `ORG:${escapeVCard(PROFILE.company)}`,
    `TITLE:${escapeVCard(PROFILE.designation)}`,
    `TEL;TYPE=CELL,VOICE:${PROFILE.phoneRaw}`,
    `EMAIL;TYPE=INTERNET:${PROFILE.email}`,
    `URL:${PROFILE.linkedin}`,
    `NOTE:${escapeVCard(PROFILE.focus.join(" | "))}`,
    `REV:${rev}`,
    "END:VCARD",
  ];
  return lines.join("\r\n");
}

export function downloadVCard() {
  const blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${PROFILE.fullName.replace(/\s+/g, "-")}.vcf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function whatsappMessage(interests = []) {
  const base = EVENT_MODE ? WHATSAPP.greetingEvent : WHATSAPP.greeting;
  if (!interests.length) return base;
  return `${base} Interested in ${interests.join(", ")}.`;
}

export function buildWhatsAppLink(interests = []) {
  return `https://wa.me/${PROFILE.whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage(interests),
  )}`;
}

export function buildEmailLink(interests = []) {
  const subject = EVENT_MODE ? EMAIL.subjectEvent : EMAIL.subject;
  return `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(whatsappMessage(interests))}`;
}

// The QR always points at whoever is hosting the card right now,
// so it keeps working on any domain you deploy to.
export function cardUrl() {
  if (typeof window === "undefined") return "";
  return window.location.origin + window.location.pathname;
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
