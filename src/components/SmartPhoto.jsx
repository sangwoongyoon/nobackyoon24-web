"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

// public/photos 폴더에서 "동 지번.확장자" 사진을 찾습니다.
// 예: "삼성동 41-16" → /photos/삼성동 41-16.PNG 를 시도.
// 확장자를 차례로 시도하고, 없으면 "사진 준비중" 표시.
const EXTS = ["jpg", "jpeg", "JPG", "png", "PNG", "webp"];

export default function SmartPhoto({ name, alt }) {
  const [i, setI] = useState(0);

  if (!name || i >= EXTS.length) {
    return (
      <div className="flex h-56 flex-col items-center justify-center gap-2 bg-black/5 text-muted md:h-full">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="M4 18l5-5 4 4 3-3 4 4" />
        </svg>
        <span className="text-xs">사진 준비중</span>
      </div>
    );
  }

  // 모바일: 사진 전체가 보이도록 자연 비율(h-auto) / 데스크톱: 3단 카드에 맞게 채움(object-cover)
  return (
    <img
      src={`/photos/${encodeURIComponent(name)}.${EXTS[i]}`}
      alt={alt}
      loading="lazy"
      onError={() => setI((n) => n + 1)}
      className="w-full h-auto object-cover md:h-full"
    />
  );
}
