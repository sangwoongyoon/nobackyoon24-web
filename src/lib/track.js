// 방문자·클릭 추적 공통 함수 (GA4 + Meta 픽셀 동시 전송)
export const GA_ID = "G-B99P9G9VB0";
export const META_PIXEL_ID = "1190152180085722";

export function track(gaEvent, metaEvent, params = {}) {
  if (typeof window === "undefined") return;
  try {
    if (window.gtag && gaEvent) window.gtag("event", gaEvent, params);
  } catch (e) {}
  try {
    if (window.fbq && metaEvent) window.fbq("track", metaEvent, params);
  } catch (e) {}
}
