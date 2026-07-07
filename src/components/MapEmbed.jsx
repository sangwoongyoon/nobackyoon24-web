"use client";

import { useEffect, useRef, useState } from "react";

// =====================================================================
//  카카오맵 임베드 컴포넌트
//  - 환경변수 NEXT_PUBLIC_KAKAO_MAP_KEY 가 있으면 실제 지도를 그립니다.
//  - 키가 아직 없으면 '카카오맵에서 보기' 링크 버튼으로 안전하게 대체됩니다.
//    (키 발급 전에도 사이트가 정상 동작합니다.)
//  - query: 표시할 주소/장소명 (projects.js 의 mapQuery 값)
// =====================================================================
export default function MapEmbed({ query, height = 220 }) {
  const ref = useRef(null);
  const [status, setStatus] = useState("loading"); // loading | ready | nokey | error
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

  useEffect(() => {
    if (!kakaoKey) {
      setStatus("nokey");
      return;
    }

    function drawMap() {
      const { kakao } = window;
      if (!kakao || !kakao.maps) return setStatus("error");
      kakao.maps.load(() => {
        const geocoder = new kakao.maps.services.Geocoder();
        const container = ref.current;
        if (!container) return;
        const map = new kakao.maps.Map(container, {
          center: new kakao.maps.LatLng(37.4979, 127.0276), // 기본: 강남역
          level: 4,
        });
        geocoder.addressSearch(query, (result, s) => {
          if (s === kakao.maps.services.Status.OK && result[0]) {
            const pos = new kakao.maps.LatLng(result[0].y, result[0].x);
            map.setCenter(pos);
            new kakao.maps.Marker({ map, position: pos });
          }
          setStatus("ready");
        });
      });
    }

    // SDK 스크립트가 이미 로드되어 있으면 바로 그리고, 없으면 삽입
    if (window.kakao && window.kakao.maps) {
      drawMap();
      return;
    }
    const id = "kakao-map-sdk";
    if (document.getElementById(id)) {
      document.getElementById(id).addEventListener("load", drawMap);
      return;
    }
    const script = document.createElement("script");
    script.id = id;
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false&libraries=services`;
    script.onload = drawMap;
    script.onerror = () => setStatus("error");
    document.head.appendChild(script);
  }, [query, kakaoKey]);

  const kakaoSearchUrl = `https://map.kakao.com/?q=${encodeURIComponent(query)}`;

  if (status === "nokey" || status === "error") {
    return (
      <a
        href={kakaoSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-brand/25 bg-brand/5 text-center text-sm text-brand"
        style={{ height }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-5.2-7-11a7 7 0 1114 0c0 5.8-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        <span className="font-semibold">{query}</span>
        <span className="text-xs text-muted">카카오맵에서 위치 보기 →</span>
      </a>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-lg" style={{ height }}>
      <div ref={ref} className="h-full w-full" />
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand/5 text-xs text-muted">
          지도 불러오는 중…
        </div>
      )}
    </div>
  );
}
