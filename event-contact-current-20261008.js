import { eventConfig } from './event-config-current-20261008.js';

// Keep one QR asset for every participant entry. No registration or entitlement logic runs here.
const qrLink = document.querySelector('[data-event-qr]');
const qrStatus = document.querySelector('[data-event-qr-status]');
const qrInstruction = document.querySelector('[data-event-qr-instruction]');
const { qrImage, qrExpiresAt, qrExpiryLabel } = eventConfig.help;

if (qrLink && qrStatus) {
  const expiry = Date.parse(qrExpiresAt);
  let expiryTimer;
  const updateQr = () => {
    window.clearTimeout(expiryTimer);
    const remaining = expiry - Date.now();
    const expired = !Number.isFinite(remaining) || remaining <= 0;
    qrLink.hidden = expired;
    if (qrInstruction) qrInstruction.hidden = expired;
    qrStatus.textContent = expired
      ? '当前入群二维码已到更新日期，请通过公司支持邮箱获取新的入群方式。'
      : qrExpiryLabel;
    if (!expired && qrImage) {
      qrLink.href = qrImage;
      qrLink.querySelector('img').src = qrImage;
      // Browsers cap timeout delays at a signed 32-bit integer. Recheck at expiry,
      // or at that cap for a future replacement QR, without a polling interval.
      expiryTimer = window.setTimeout(updateQr, Math.min(remaining, 2147483647));
    }
  };
  updateQr();
  window.addEventListener('pageshow', updateQr);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') updateQr();
  });
}
