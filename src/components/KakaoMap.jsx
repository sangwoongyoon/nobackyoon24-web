"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

// 카카오맵 SDK는 한 번만 로드
let sdkPromise = null;
function loadSDK(key) {
  if (typeof window !== "undefined" && window.kakao && window.kakao.maps) return Promise.resolve();
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=services`;
    s.async = true;
    s.onload = () => window.kakao.maps.load(resolve);
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return sdkPromise;
}

// 정확한 주소로 카카오맵을 그립니다. 화면에 들어올 때만 로딩(성능).
export default function KakaoMap({ query }) {
  const key = site.kakaoMapKey;
  const hasKey = key && !key.startsWith("PASTE");
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const kakaoUrl = `https://map.kakao.com/?q=${encodeURIComponent(query)}`;

  useEffect(() => {
    if (!hasKey || !ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "250px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [hasKey]);

  useEffect(() => {
    if (!visible || !hasKey) return;
    let cancelled = false;
    loadSDK(key)
      .then(() => {
        if (cancelled || !ref.current) return;
        const { kakao } = window;
        const map = new kakao.maps.Map(ref.current, {
          center: new kakao.maps.LatLng(37.4979, 127.0276),
          level: 4,
        });
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(query, (res, status) => {
          if (status === kakao.maps.services.Status.OK && res[0]) {
            const pos = new kakao.maps.LatLng(res[0].y, res[0].x);
            map.setCenter(pos);
            new kakao.maps.Marker({ map, position: pos });
          }
        });
      })
      .catch(() => setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [visible, hasKey, key, query]);

  // 키가 없거나 로딩 실패 시: 카카오맵 링크로 대체 (사이트 안 깨짐)
  if (!hasKey || failed) {
    return (
      <a
        href={kakaoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-56 flex-col items-center justify-center gap-2 bg-brand/5 text-brand md:h-full"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-5.2-7-11a7 7 0 1114 0c0 5.8-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.4" />
        </svg>
        <span className="text-xs font-semibold">카카오맵에서 보기</span>
      </a>
    );
  }

  return <div ref={ref} className="h-56 w-full bg-black/5 md:h-full" />;
}
