function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Composes a phone-wallpaper-sized PNG (1170x2532) with the QR centered
// on the dark background — ready to set as a lock screen.
export async function downloadLockScreenQr(
  qrCanvas,
  { name, title, caption, filename },
) {
  if (!qrCanvas) return;
  const W = 1170;
  const H = 2532;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W / 2, 340, 0, W / 2, 340, 950);
  glow.addColorStop(0, "rgba(30, 42, 85, 0.07)");
  glow.addColorStop(1, "rgba(30, 42, 85, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  try {
    await document.fonts.ready;
  } catch (e) {
    /* fall back to system fonts */
  }

  ctx.textAlign = "center";
  ctx.fillStyle = "#0F172A";
  ctx.font = "600 72px 'IBM Plex Sans', 'IBM Plex Sans Arabic', sans-serif";
  ctx.fillText(name, W / 2, 300);
  ctx.fillStyle = "#64748B";
  ctx.font = "400 46px 'IBM Plex Sans', 'IBM Plex Sans Arabic', sans-serif";
  ctx.fillText(title, W / 2, 372);

  const tile = Math.floor(W * 0.74);
  const tileX = Math.round((W - tile) / 2);
  const tileY = 520;
  ctx.fillStyle = "#FFFFFF";
  roundRect(ctx, tileX, tileY, tile, tile, 56);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#E2E8F0";
  ctx.stroke();

  const pad = 44;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(qrCanvas, tileX + pad, tileY + pad, tile - pad * 2, tile - pad * 2);
  ctx.imageSmoothingEnabled = true;

  ctx.fillStyle = "#0891B2";
  ctx.font = "500 48px 'JetBrains Mono', 'IBM Plex Sans Arabic', monospace";
  ctx.fillText(caption, W / 2, tileY + tile + 130);

  const a = document.createElement("a");
  a.href = c.toDataURL("image/png");
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
