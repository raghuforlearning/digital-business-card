import { useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import { Download, Wallpaper, X } from "lucide-react";
import { toast } from "sonner";
import { PROFILE } from "../config";
import { cardUrl, downloadCanvasPng } from "../lib/vcard";
import { downloadLockScreenQr } from "../lib/wallpaper";

export function FullScreenQr({ onClose, t, p }) {
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
    toast.success(t.toastQr, {
      description: t.toastQrDesc,
    });
  };

  const handleWallpaper = async () => {
    const canvas = tileRef.current?.querySelector("canvas");
    if (!canvas) return;
    await downloadLockScreenQr(canvas, {
      name: p.displayName,
      title: p.designation,
      caption: t.fsqrCaption,
      filename: "raghu-m-qr-lockscreen.png",
    });
    toast.success(t.toastWallpaper, {
      description: t.toastWallpaperDesc,
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
        <img
          src={p.logo}
          alt={p.company}
          className="fsqr-logo"
          data-testid="fsqr-company-logo"
        />
        <span className="eyebrow">{t.fsqrEyebrow}</span>
        <h1>{p.displayName}</h1>
        <p className="fsqr-role">{p.designation}</p>
        <p className="fsqr-focus">{p.focusShort.join("  |  ")}</p>

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

        <p className="fsqr-caption">{t.fsqrCaption}</p>

        <div className="btn-row fsqr-actions">
          <button
            type="button"
            className="btn btn-ghost"
            data-testid="fullscreen-download-qr-button"
            onClick={handleDownload}
          >
            <Download size={16} aria-hidden="true" />
            {t.saveQrPng}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            data-testid="fullscreen-download-wallpaper-button"
            onClick={handleWallpaper}
          >
            <Wallpaper size={17} aria-hidden="true" />
            {t.saveLockScreen}
          </button>
        </div>
        <p className="fsqr-hint">{t.fsqrHint}</p>
      </motion.div>
    </motion.div>
  );
}
