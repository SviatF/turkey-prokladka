const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@melbet_turkey/";
const TELEGRAM_CHANNEL_URL = "https://t.me/+lMgpDkM6T8owYTA8";

const cta = document.getElementById("youtubeCta");
const telegramCard = document.getElementById("telegramCard");
const landing = document.querySelector(".landing");
const shell = document.querySelector(".page-shell");

if (cta) {
  cta.href = YOUTUBE_CHANNEL_URL;

  cta.addEventListener("click", () => {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "youtube_channel_click",
        destination: YOUTUBE_CHANNEL_URL,
      });
    } catch (_) {
      // CTA navigation should never be blocked by analytics.
    }
  });
}

if (telegramCard) {
  telegramCard.href = TELEGRAM_CHANNEL_URL;

  telegramCard.addEventListener("click", () => {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "telegram_channel_click",
        destination: TELEGRAM_CHANNEL_URL,
      });
    } catch (_) {
      // CTA navigation should never be blocked by analytics.
    }
  });
}

function fitLandingToViewport() {
  if (!landing || !shell) return;

  // Measure the complete unscaled landing first.
  landing.style.transform = "none";
  landing.style.marginTop = "0px";

  const viewportWidth = window.visualViewport?.width || window.innerWidth;
  const viewportHeight = window.visualViewport?.height || window.innerHeight;
  const isMobile = viewportWidth <= 640;

  // Small safe area around the complete composition.
  const sideGap = isMobile ? 4 : 10;
  const topBottomGap = isMobile ? 4 : 8;

  const naturalWidth = Math.ceil(landing.getBoundingClientRect().width);
  const naturalHeight = Math.ceil(landing.scrollHeight);

  const availableWidth = Math.max(1, viewportWidth - sideGap * 2);
  const availableHeight = Math.max(1, viewportHeight - topBottomGap * 2);

  const widthScale = availableWidth / naturalWidth;
  const heightScale = availableHeight / naturalHeight;

  // IMPORTANT: do not force a minimum scale. The previous 0.5 floor
  // could leave the bottom content/CTA outside the viewport.
  const scale = Math.min(1, widthScale, heightScale);

  landing.style.transformOrigin = "top center";
  landing.style.transform = `scale(${scale})`;

  // Center the fully scaled composition vertically when there is spare space.
  const scaledHeight = naturalHeight * scale;
  const freeSpace = Math.max(0, viewportHeight - scaledHeight);
  landing.style.marginTop = `${Math.floor(freeSpace / 2)}px`;

  shell.style.width = `${viewportWidth}px`;
  shell.style.height = `${viewportHeight}px`;
}

let resizeFrame;
function queueFit() {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(() => {
    requestAnimationFrame(fitLandingToViewport);
  });
}

window.addEventListener("load", queueFit);
window.addEventListener("resize", queueFit);
window.addEventListener("orientationchange", queueFit);
window.visualViewport?.addEventListener("resize", queueFit);
window.visualViewport?.addEventListener("scroll", queueFit);

document.fonts?.ready.then(queueFit).catch(() => {});

// Images can change the natural page height after first paint.
document.querySelectorAll("img").forEach((img) => {
  if (!img.complete) img.addEventListener("load", queueFit, { once: true });
});
