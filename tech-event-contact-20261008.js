import { eventConfig } from './tech-event-config-20261008.js';

// Keep one QR asset for every participant entry. No registration or entitlement logic runs here.
const qrLink = document.querySelector('[data-event-qr]');
const qrStatus = document.querySelector('[data-event-qr-status]');
const qrInstruction = document.querySelector('[data-event-qr-instruction]');
const { qrImage, qrPermanent, qrExpiresAt, qrExpiryLabel } = eventConfig.help;

if (qrLink && qrStatus) {
  const expiry = Date.parse(qrExpiresAt);
  const permanent = qrPermanent === true;
  let expiryTimer;
  const updateQr = () => {
    window.clearTimeout(expiryTimer);
    const remaining = expiry - Date.now();
    const expired = !permanent && (!Number.isFinite(remaining) || remaining <= 0);
    qrLink.hidden = expired;
    if (qrInstruction) qrInstruction.hidden = expired;
    qrStatus.textContent = expired
      ? '当前入群二维码已到更新日期，请通过公司支持邮箱获取新的入群方式。'
      : qrExpiryLabel;
    if (!expired && qrImage) {
      qrLink.href = qrImage;
      qrLink.querySelector('img').src = qrImage;
      if (!permanent) {
        // Temporary QR codes still expire automatically; permanent codes need no timer.
        expiryTimer = window.setTimeout(updateQr, Math.min(remaining, 2147483647));
      }
    }
  };
  updateQr();
  window.addEventListener('pageshow', updateQr);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') updateQr();
  });
}
