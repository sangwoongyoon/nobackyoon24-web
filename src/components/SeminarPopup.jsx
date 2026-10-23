"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { seminar } from "@/data/seminar";

// 채용세미나 팝업 (홈 + 세미나 페이지)
//  - seminar.popup.show 를 false 로 바꾸면 꺼집니다.
//  - endAt 이 지나면 자동으로 안 뜹니다.
//  - "오늘 하루 보지 않기" 누르면 그 브라우저에선 자정까지 안 뜹니다.
//  - 팝업 위쪽 카드 어디를 눌러도 신청 폼으로 바로 이동합니다.
const KEY = "seminarPopupHideUntil";

function dDay(endAt) {
  const event = new Date(endAt);
  const now = new Date();
  const a = Date.UTC(event.getFullYear(), event.getMonth(), event.getDate());
  const b = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const d = Math.round((a - b) / 86400000);
  return d > 0 ? `D-${d}` : d === 0 ? "D-DAY" : null;
}

export default function SeminarPopup({ onSeminarPage = false }) {
  const cfg = seminar.popup;
  const [open, setOpen] = useState(false);
  const [dday, setDday] = useState(null);

  useEffect(() => {
    if (!cfg?.show) return;
    if (cfg.endAt && Date.now() > new Date(cfg.endAt).getTime()) return;
    let hidden = false;
    try {
      hidden = Number(window.localStorage.getItem(KEY) || 0) > Date.now();
    } catch {}
    if (hidden) return;
    setDday(dDay(cfg.endAt));
    const t = setTimeout(() => setOpen(true), 400);
    return () => clearTimeout(t);
  }, [cfg]);

  useEffect(() => {
    if (!open) return;
    const esc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open]);

  const hideToday = () => {
    try {
      const d = new Date();
      d.setHours(24, 0, 0, 0);
      window.localStorage.setItem(KEY, String(d.getTime()));
    } catch {}
    setOpen(false);
  };

  if (!open) return null;

  const apply = { href: seminar.applyUrl, target: "_blank", rel: "noopener noreferrer", onClick: () => setOpen(false) };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="원빌딩 채용 세미나 2기 신청"
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-[2px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[400px] overflow-hidden rounded-2xl bg-white shadow-2xl"
        style={{ animation: "popupIn .3s cubic-bezier(.2,.9,.3,1.2)" }}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="닫기"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/25 text-white hover:bg-black/40"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        {/* 위쪽 카드 전체 = 신청 링크 */}
        <a {...apply} className="block bg-gradient-to-br from-brand-dark via-brand to-brand-light px-6 pb-6 pt-6 text-white">
          <div className="flex items-center gap-2">
            {dday ? (
              <span className="rounded-md bg-red-500 px-2.5 py-1 text-sm font-extrabold tracking-wide text-white" style={{ animation: "blink 1.6s ease-in-out infinite" }}>
                {dday}
              </span>
            ) : null}
            <span className="rounded-md bg-accent px-2.5 py-1 text-xs font-extrabold text-brand-dark">선착순 20명 무료</span>
          </div>

          <p className="mt-4 text-[15px] font-semibold leading-snug text-white/85">
            {seminar.heroCopy[0]}
            <span className="block text-accent">{seminar.heroCopy[1]}</span>
          </p>
          <p className="mt-4 text-xs font-bold tracking-[0.2em] text-accent">{seminar.eyebrow}</p>
          <h2 className="text-[32px] font-extrabold leading-tight">{seminar.title}</h2>
          <p className="mt-1 text-lg font-bold tabular-nums">{cfg.dateText}</p>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex -space-x-3">
              {seminar.mentors.map((m) =>
                m.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={m.name} src={m.photo} alt={m.name} className="h-11 w-11 rounded-full border-2 border-brand bg-white object-cover object-top" />
                ) : (
                  <span key={m.name} className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand bg-accent font-bold text-brand-dark">{m.name[0]}</span>
                )
              )}
            </div>
            <p className="text-xs leading-snug text-white/80">
              현직 멘토 3인이 직접 공개
              <br />
              {seminar.mentors.map((m) => m.name).join(" · ")}
            </p>
          </div>
        </a>

        <div className="px-5 pb-4 pt-5">
          {/* 메인 CTA */}
          <a
            {...apply}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-accent-dark via-accent to-accent-dark px-6 py-5 text-[24px] font-extrabold text-brand-dark shadow-[0_8px_24px_-6px_rgba(200,162,75,.8)] transition active:scale-[.98]"
            style={{ animation: "ctaPulse 1.8s ease-in-out infinite" }}
          >
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/50 blur-sm" style={{ animation: "shine 2.4s ease-in-out infinite" }} />
            <span className="relative">지금 무료 신청</span>
            <svg className="relative transition group-hover:translate-x-1" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
          <p className="mt-2.5 text-center text-xs font-semibold text-muted">
            참가비 0원 · 자격증 없어도 OK · <span className="text-red-500">선착순 마감</span>
          </p>

          <div className="mt-3 text-center">
            {onSeminarPage ? (
              <button type="button" onClick={() => setOpen(false)} className="text-sm font-semibold text-brand underline underline-offset-4">
                멘토·프로그램 먼저 보기
              </button>
            ) : (
              <Link href="/seminar" onClick={() => setOpen(false)} className="text-sm font-semibold text-brand underline underline-offset-4">
                세미나 자세히 보기
              </Link>
            )}
          </div>
        </div>

        <div className="flex border-t border-black/10 text-[13px]">
          <button type="button" onClick={hideToday} className="flex-1 py-3 text-muted hover:bg-black/5">오늘 하루 보지 않기</button>
          <span className="w-px bg-black/10" />
          <button type="button" onClick={() => setOpen(false)} className="flex-1 py-3 font-semibold text-ink hover:bg-black/5">닫기</button>
        </div>
      </div>
      <style>{`
        @keyframes popupIn{from{opacity:0;transform:translateY(16px) scale(.96)}to{opacity:1;transform:none}}
        @keyframes ctaPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
        @keyframes shine{0%{left:-50%}60%,100%{left:130%}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.55}}
        @media (prefers-reduced-motion: reduce){*{animation:none!important}}
      `}</style>
    </div>
  );
}
