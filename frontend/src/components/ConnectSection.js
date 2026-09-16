import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { INTERESTS } from "../config";
import { buildWhatsAppLink, whatsappMessage } from "../lib/vcard";
import { interestLabel } from "../i18n";

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function ConnectSection({ lang, t, profile }) {
  const [selected, setSelected] = useState([]);

  const toggle = (item) =>
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );

  const labels = selected.map((i) => interestLabel(i, lang));

  return (
    <motion.section
      className="panel"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="panel-head">
        <span className="eyebrow">{t("networkingEyebrow")}</span>
        <h2>{t("letsConnect")}</h2>
      </div>
      <p className="panel-sub">{t("connectSub")}</p>

      <div className="chips">
        {INTERESTS.map((item) => {
          const active = selected.includes(item);
          return (
            <button
              key={item}
              type="button"
              data-testid={`interest-chip-${slug(item)}`}
              className={`chip${active ? " chip-selected" : ""}`}
              aria-pressed={active}
              onClick={() => toggle(item)}
            >
              {interestLabel(item, lang)}
            </button>
          );
        })}
      </div>

      <a
        className="btn btn-wa"
        data-testid="whatsapp-interest-button"
        href={buildWhatsAppLink(labels, lang, profile)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle size={17} aria-hidden="true" />
        {t("whatsappRaghu", { name: profile.shortName })}
        {selected.length > 0 &&
          ` · ${selected.length} ${
            selected.length > 1 ? t("topics") : t("topic")
          }`}
      </a>

      <div className="preview-row">
        <p className="msg-preview" data-testid="whatsapp-message-preview">
          &ldquo;{whatsappMessage(labels, lang, profile)}&rdquo;
        </p>
        {selected.length > 0 && (
          <button
            type="button"
            className="link-btn"
            data-testid="clear-interests-button"
            onClick={() => setSelected([])}
          >
            {t("clear")}
          </button>
        )}
      </div>
    </motion.section>
  );
}
