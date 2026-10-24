"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { GA_ID, META_PIXEL_ID, track } from "@/lib/track";

// 링크 주소로 어떤 버튼인지 판별 → 이벤트 이름 결정
function classify(href) {
  if (!href) return null;
  if (href.startsWith("tel:")) return ["click_call", "Contact", { method: "phone" }];
  if (/open\.kakao\.com|pf\.kakao\.com/.test(href)) return ["click_kakao", "Contact", { method: "kakao" }];
  if (/forms\.gle|docs\.google\.com\/forms/.test(href)) return ["seminar_apply_click", "Lead", { content_name: "채용세미나 2기" }];
  return null;
}

export default function Analytics() {
  const pathname = usePathname();
  const first = useRef(true);

  // 페이지 이동 시 Meta PageView (첫 로드는 기본 코드에서 전송)
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    try {
      if (window.fbq) window.fbq("track", "PageView");
    } catch (e) {}
  }, [pathname]);

  // 사이트 전체 버튼 클릭 감지 (전화 / 카톡 / 세미나 신청)
  useEffect(() => {
    function onClick(e) {
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      const hit = classify(a.getAttribute("href"));
      if (!hit) return;
      const [ga, meta, params] = hit;
      track(ga, meta, { ...params, page_path: window.location.pathname, link_text: (a.textContent || "").trim().slice(0, 40) });
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <>
      {/* Google Analytics 4 */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>

      {/* Meta 픽셀 */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
      </Script>
      <noscript>
        <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}
