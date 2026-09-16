import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import { Download, Maximize2 } from "lucide-react";
import { toast } from "sonner";
import { cardUrl, buildVCard, downloadCanvasPng } from "../lib/vcard";

export function QrSection({ onShowQr, t, p }) {
  const [tab, setTab] = useState("link");
  const tileRef = useRef(null);
  const value = tab === "link" ? cardUrl(p.id) : buildVCard(p);

  const handleDownload = () => {
    const canvas = tileRef.current?.querySelector("canvas");
    if (!canvas) return;
    downloadCanvasPng(
      canvas,
      tab === "link" ? `${p.id}-digital-card-qr.png` : `${p.id}-contact-qr.png`,
    );
    toast.success(t("toastQr"), {
      description: t("toastQrDesc"),
    });
  };

  return (
    <motion.section
      className="panel"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="panel-head">
        <span className="eyebrow">{t("qrEyebrow")}</span>
        <h2>{t("scanToConnect")}</h2>
      </div>

      <div className="seg" role="tablist" aria-label="QR code type">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "link"}
          data-testid="qr-tab-card-link"
          className={tab === "link" ? "seg-active" : ""}
          onClick={() => setTab("link")}
        >
          {t("tabLink")}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "vcard"}
          data-testid="qr-tab-vcard"
          className={tab === "vcard" ? "seg-active" : ""}
          onClick={() => setTab("vcard")}
        >
          {t("tabVCard")}
        </button>
      </div>

      <div className="qr-tile" data-testid="qr-code-display" ref={tileRef}>
        <QRCodeCanvas
          value={value}
          size={600}
          level="M"
          marginSize={2}
          bgColor="#FFFFFF"
          fgColor="#0A1220"
          title={tab === "link" ? "Digital business card" : "vCard"}
        />
      </div>
      <p className="qr-caption">
        {tab === "link"
          ? t("captionLink")
          : t("captionVCard", { name: p.shortName })}
      </p>

      <div className="btn-row">
        <button
          type="button"
          className="btn btn-ghost"
          data-testid="download-qr-button"
          onClick={handleDownload}
        >
          <Download size={16} aria-hidden="true" />
          {t("downloadPng")}
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-cyan"
          data-testid="show-my-qr-button"
          onClick={onShowQr}
        >
          <Maximize2 size={16} aria-hidden="true" />
          {t("showMyQr")}
        </button>
      </div>
    </motion.section>
  );
}
