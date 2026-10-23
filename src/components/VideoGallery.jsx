"use client";

import { useEffect, useState } from "react";

// 세로형(쇼츠) 리뷰영상 갤러리 — 카드를 누르면 팝업으로 재생
// video: { title, youtubeId?, src? }
export default function VideoGallery({ videos = [] }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {videos.map((v, i) => {
          const ready = Boolean(v.youtubeId || v.src);
          const thumb = v.thumbnail || (v.youtubeId ? `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg` : null);
          return (
            <button
              key={v.title}
              type="button"
              disabled={!ready}
              onClick={() => setActive(v)}
              className="group relative aspect-[9/16] overflow-hidden rounded-xl bg-brand text-left shadow-sm transition enabled:hover:-translate-y-0.5 enabled:hover:shadow-lg disabled:cursor-default"
            >
              {thumb ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={thumb} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-brand-light via-brand to-brand-dark" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* 재생 버튼 */}
              <div className="absolute inset-0 flex items-center justify-center">
                {ready ? (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand shadow-lg transition group-hover:scale-110">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                ) : (
                  <span className="rounded-full border border-white/30 px-3 py-1 text-xs font-semibold text-white/70">곧 공개</span>
                )}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <p className="text-[11px] font-semibold text-accent">1기 입사자 인터뷰 {String(i + 1).padStart(2, "0")}</p>
                <p className="mt-1 text-sm font-bold leading-snug text-white">{v.title}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 재생 팝업 */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-[min(420px,calc(85vh*9/16))]">
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="닫기"
              className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
            <div className="aspect-[9/16] w-full overflow-hidden rounded-xl bg-black">
              {active.youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1&playsinline=1&rel=0`}
                  title={active.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : (
                <video src={active.src} controls autoPlay playsInline className="h-full w-full object-contain" />
              )}
            </div>
            <p className="mt-3 text-center text-sm font-semibold text-white">{active.title}</p>
          </div>
        </div>
      )}
    </>
  );
}
