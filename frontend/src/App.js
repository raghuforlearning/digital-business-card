import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Download, Linkedin, MessageCircle, Mail, ShieldCheck } from "lucide-react";
import { Toaster, toast } from "sonner";
import { Avatar } from "./components/Avatar";
import { ConnectSection } from "./components/ConnectSection";
import { QrSection } from "./components/QrSection";
import { FullScreenQr } from "./components/FullScreenQr";
import { EVENT_MODE, EVENT } from "./config";
import { translate, profileFor } from "./i18n";
import { EMPLOYEES, resolveProfileId } from "./employees";
import { downloadVCard, buildWhatsAppLink, buildEmailLink } from "./lib/vcard";
import "./App.css";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = (i) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.07 * i, duration: 0.55, ease },
});

export default function App() {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem("card-lang");
      if (saved === "en" || saved === "ar") return saved;
    } catch (e) {
      /* private mode — fall through */
    }
    return (navigator.language || "").toLowerCase().startsWith("ar")
      ? "ar"
      : "en";
  });
  const [qrOpen, setQrOpen] = useState(false);

  const profile = useMemo(
    () => EMPLOYEES.find((e) => e.id === resolveProfileId()) || EMPLOYEES[0],
    [],
  );
  const p = profileFor(lang, profile);
  const t = (key, vars) => translate(lang, key, vars);

  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("lang-ar", lang === "ar");
    try {
      localStorage.setItem("card-lang", lang);
    } catch (e) {
      /* private mode — skip saving */
    }
  }, [lang]);

  const handleSaveContact = () => {
    downloadVCard(profile);
    toast.success(t("toastVCard"), {
      description: t("toastVCardDesc", { name: p.shortName }),
    });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="page">
        <div className="backdrop" aria-hidden="true" />

        <main className="card-shell">
          <div
            className="lang-switch"
            data-testid="language-toggle"
            role="group"
            aria-label="Language"
          >
            <button
              type="button"
              data-testid="lang-en-button"
              className={lang === "en" ? "lang-active" : ""}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              type="button"
              data-testid="lang-ar-button"
              className={lang === "ar" ? "lang-active" : ""}
              onClick={() => setLang("ar")}
            >
              عربي
            </button>
          </div>

          <motion.div className="brand-head" {...fadeUp(0)}>
            <img
              src={p.logo}
              alt={p.company}
              className="brand-logo"
              data-testid="company-logo"
            />
          </motion.div>

          {EVENT_MODE && (
            <motion.div
              className="event-badge"
              data-testid="gisec-event-badge"
              {...fadeUp(1)}
            >
              <span className="event-dot" aria-hidden="true" />
              <span>{EVENT.badge}</span>
              <span className="event-tagline">{t("eventTagline")}</span>
            </motion.div>
          )}

          <motion.header className="profile" {...fadeUp(2)}>
            <Avatar p={p} />
            <h1 className="name" data-testid="profile-name">
              {p.displayName}
            </h1>
            <p className="role" data-testid="profile-title">
              {p.designation}
            </p>
            <p className="org" data-testid="profile-organization">
              {p.company}
            </p>
            <ul className="focus-list">
              {p.focus.map((f, idx) => (
                <li key={f}>
                  {idx > 0 && <span className="focus-dot" aria-hidden="true" />}
                  {f}
                </li>
              ))}
            </ul>
          </motion.header>

          <motion.section className="actions" {...fadeUp(3)}>
            <button
              type="button"
              className="btn btn-primary"
              data-testid="save-contact-button"
              onClick={handleSaveContact}
            >
              <Download size={18} aria-hidden="true" />
              {t("saveContact")}
            </button>
            <div className="action-row">
              <a
                className="btn btn-ghost"
                data-testid="linkedin-connect-button"
                href={p.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={17} aria-hidden="true" />
                LinkedIn
              </a>
              <a
                className="btn btn-ghost icon-teal"
                data-testid="whatsapp-connect-button"
                href={buildWhatsAppLink([], lang, profile)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={17} aria-hidden="true" />
                WhatsApp
              </a>
              <a
                className="btn btn-ghost"
                data-testid="email-direct-button"
                href={buildEmailLink([], lang, profile)}
              >
                <Mail size={17} aria-hidden="true" />
                {t("emailMe")}
              </a>
            </div>
          </motion.section>

          <ConnectSection lang={lang} t={t} profile={profile} />
          <QrSection onShowQr={() => setQrOpen(true)} t={t} p={p} />

          <motion.footer className="footer" {...fadeUp(5)}>
            <div className="footer-privacy" data-testid="privacy-line">
              <ShieldCheck size={13} aria-hidden="true" />
              <span>{t("privacyLine")}</span>
            </div>
            <a
              href={`tel:${p.phoneRaw}`}
              data-testid="footer-phone-link"
            >
              {p.phoneDisplay}
            </a>
            <span className="footer-sep" aria-hidden="true">
              ·
            </span>
            <a
              href={`mailto:${p.email}`}
              data-testid="footer-email-link"
            >
              {p.email}
            </a>
          </motion.footer>
        </main>

        <AnimatePresence>
          {qrOpen && (
            <FullScreenQr onClose={() => setQrOpen(false)} t={t} p={p} />
          )}
        </AnimatePresence>

        <Toaster theme="light" position="bottom-center" />
      </div>
    </MotionConfig>
  );
}
