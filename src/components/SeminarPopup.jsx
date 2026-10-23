"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { seminar } from "@/data/seminar";

// 홈 첫 화면 채용세미나 팝업
//  - seminar.popup.show 를 false 로 바꾸면 꺼집니다.
//  - endAt 이 지나면 자동으로 안 뜹니다.
//  - "오늘 하루 보지 않기" 누르면 그 브라우저에선 자정까지 안 뜹니다.
const KEY = "seminarPopupHideUntil";

export default function SeminarPopup({ onSeminarPage = false }) {
  const cfg = seminar.popup;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!cfg?.show) return;
    if (cfg.endAt && Date.now() > new Date(cfg.endAt).getTime()) return;
    let hidden = false;
    try {
      const until = Number(window.localStorage.getItem(KEY) || 0);
      hidden = until > Date.now();
    } catch {}
    if (hidden) return;
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="원빌딩 채용 세미나 2기 안내"
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[400px] overflow-hidden rounded-2xl bg-white shadow-2xl"
        style={{ animation: "popupIn .28s ease-out" }}
      >
        <div className="relative bg-gradient-to-br from-brand-dark via-brand to-brand-light px-6 pb-6 pt-7 text-white">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="닫기"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
          </button>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-brand-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> 참가자 모집중
          </span>
          <p className="mt-4 text-[15px] font-semibold leading-snug text-white/85">
            {seminar.heroCopy[0]}
            <span className="block text-accent">{seminar.heroCopy[1]}</span>
          </p>
          <p className="mt-4 text-xs font-bold tracking-[0.2em] text-accent">{seminar.eyebrow}</p>
          <h2 className="text-3xl font-extrabold">{seminar.title}</h2>

          {/* 멘토 3인 */}
          <div className="mt-5 flex items-center gap-3">
            <div className="flex -space-x-3">
              {seminar.mentors.map((m) =>
                m.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={m.name} src={m.photo} alt={m.name} className="h-11 w-11 rounded-full border-2 border-brand object-cover object-top" />
                ) : (
                  <span key={m.name} className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand bg-accent font-bold text-brand-dark">{m.name[0]}</span>
                )
              )}
            </div>
            <p className="text-xs leading-snug text-white/80">
              현직 멘토 3인
              <br />
              {seminar.mentors.map((m) => m.name).join(" · ")}
            </p>
          </div>
        </div>

        <div className="px-6 py-5">
          <p className="text-xl font-extrabold tabular-nums text-brand">
            {cfg.dateText}
          </p>
          <p className="mt-1 text-sm font-semibold text-muted">참가비 무료 · 선착순 20명 · 자격증 없어도 OK</p>

          <div className="mt-5 grid gap-2">
            <a href={seminar.applyUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="btn-primary w-full py-3.5">
              무료 세미나 신청하기
            </a>
            {onSeminarPage ? (
              <button type="button" onClick={() => setOpen(false)} className="btn-ghost w-full py-3">
                세미나 자세히 보기
              </button>
            ) : (
              <Link href="/seminar" onClick={() => setOpen(false)} className="btn-ghost w-full py-3">
                세미나 자세히 보기
              </Link>
            )}
          </div>
        </div>

        <div className="flex border-t border-black/10 text-sm">
          <button type="button" onClick={hideToday} className="flex-1 py-3 text-muted hover:bg-black/5">오늘 하루 보지 않기</button>
          <span className="w-px bg-black/10" />
          <button type="button" onClick={() => setOpen(false)} className="flex-1 py-3 font-semibold text-ink hover:bg-black/5">닫기</button>
        </div>
      </div>
      <style>{`@keyframes popupIn{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
