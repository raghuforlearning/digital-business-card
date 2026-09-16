import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Download, Linkedin, MessageCircle, Mail } from "lucide-react";
import { Toaster, toast } from "sonner";
import { Avatar } from "./components/Avatar";
import { ConnectSection } from "./components/ConnectSection";
import { QrSection } from "./components/QrSection";
import { FullScreenQr } from "./components/FullScreenQr";
import { PROFILE, EVENT_MODE, EVENT } from "./config";
import { downloadVCard, buildWhatsAppLink, buildEmailLink } from "./lib/vcard";
import "./App.css";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = (i) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.07 * i, duration: 0.55, ease },
});

export default function App() {
  const [qrOpen, setQrOpen] = useState(false);

  const handleSaveContact = () => {
    downloadVCard();
    toast.success("Contact card ready", {
      description: "Open the downloaded file to add Raghu to your contacts.",
    });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="page">
        <div className="backdrop" aria-hidden="true" />

        <main className="card-shell">
          {EVENT_MODE && (
            <motion.div
              className="event-badge"
              data-testid="gisec-event-badge"
              {...fadeUp(0)}
            >
              <span className="event-dot" aria-hidden="true" />
              <span>{EVENT.badge}</span>
              <span className="event-tagline">{EVENT.tagline}</span>
            </motion.div>
          )}

          <motion.header className="profile" {...fadeUp(1)}>
            <Avatar />
            <h1 className="name" data-testid="profile-name">
              {PROFILE.displayName}
            </h1>
            <p className="role" data-testid="profile-title">
              {PROFILE.designation}
            </p>
            <p className="org" data-testid="profile-organization">
              {PROFILE.company}
            </p>
            <ul className="focus-list">
              {PROFILE.focus.map((f, idx) => (
                <li key={f}>
                  {idx > 0 && <span className="focus-dot" aria-hidden="true" />}
                  {f}
                </li>
              ))}
            </ul>
          </motion.header>

          <motion.section className="actions" {...fadeUp(2)}>
            <button
              type="button"
              className="btn btn-primary"
              data-testid="save-contact-button"
              onClick={handleSaveContact}
            >
              <Download size={18} aria-hidden="true" />
              Save Contact
            </button>
            <div className="action-row">
              <a
                className="btn btn-ghost"
                data-testid="linkedin-connect-button"
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={17} aria-hidden="true" />
                LinkedIn
              </a>
              <a
                className="btn btn-ghost icon-teal"
                data-testid="whatsapp-connect-button"
                href={buildWhatsAppLink([])}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={17} aria-hidden="true" />
                WhatsApp
              </a>
              <a
                className="btn btn-ghost"
                data-testid="email-direct-button"
                href={buildEmailLink([])}
              >
                <Mail size={17} aria-hidden="true" />
                Email
              </a>
            </div>
          </motion.section>

          <ConnectSection />
          <QrSection onShowQr={() => setQrOpen(true)} />

          <motion.footer className="footer" {...fadeUp(4)}>
            <a href={`tel:${PROFILE.phoneRaw}`} data-testid="footer-phone-link">
              {PROFILE.phoneDisplay}
            </a>
            <span className="footer-sep" aria-hidden="true">
              ·
            </span>
            <a href={`mailto:${PROFILE.email}`} data-testid="footer-email-link">
              {PROFILE.email}
            </a>
          </motion.footer>
        </main>

        <AnimatePresence>
          {qrOpen && <FullScreenQr onClose={() => setQrOpen(false)} />}
        </AnimatePresence>

        <Toaster theme="dark" position="top-center" />
      </div>
    </MotionConfig>
  );
}
