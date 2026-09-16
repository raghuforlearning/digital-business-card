import { useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import { Download, X } from "lucide-react";
import { toast } from "sonner";
import { PROFILE } from "../config";
import { cardUrl, downloadCanvasPng } from "../lib/vcard";

export function FullScreenQr({ onClose }) {
  const tileRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const handleDownload = () => {
    const canvas = tileRef.current?.querySelector("canvas");
    if (!canvas) return;
    downloadCanvasPng(canvas, "raghu-m-qr.png");
    toast.success("QR saved as PNG", {
      description: "Perfect for your lock screen or gallery.",
    });
  };

  return (
    <motion.div
      className="fsqr"
      data-testid="fullscreen-qr-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button
        type="button"
        className="fsqr-close"
        data-testid="close-fullscreen-qr-button"
        onClick={onClose}
        aria-label="Close QR view"
      >
        <X size={20} aria-hidden="true" />
      </button>

      <motion.div
        className="fsqr-inner"
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="eyebrow">Digital business card</span>
        <h1>{PROFILE.displayName}</h1>
        <p className="fsqr-role">{PROFILE.designation}</p>
        <p className="fsqr-focus">{PROFILE.focusShort.join("  |  ")}</p>

        <div
          className="qr-tile qr-tile-lg"
          data-testid="fullscreen-qr-image"
          ref={tileRef}
        >
          <QRCodeCanvas
            value={cardUrl()}
            size={1080}
            level="M"
            marginSize={2}
            bgColor="#FFFFFF"
            fgColor="#0A1220"
            title="Digital business card"
          />
        </div>

        <p className="fsqr-caption">Scan to Connect</p>

        <button
          type="button"
          className="btn btn-primary btn-download"
          data-testid="fullscreen-download-qr-button"
          onClick={handleDownload}
        >
          <Download size={17} aria-hidden="true" />
          Save QR as PNG
        </button>
        <p className="fsqr-hint">
          Point the camera at the code — no app needed
        </p>
      </motion.div>
    </motion.div>
  );
}
