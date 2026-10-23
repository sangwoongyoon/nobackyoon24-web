"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, navItems, navHighlight } from "@/data/site";

const isActive = (pathname, href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

function Chevron({ open }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      className={`transition-transform ${open ? "rotate-180" : ""}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

// 한시적 강조 버튼 (채용세미나 등)
function HighlightButton({ compact = false, onClick }) {
  if (!navHighlight?.show) return null;
  return (
    <Link
      href={navHighlight.href}
      onClick={onClick}
      className={`group relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-accent font-bold text-brand-dark shadow-sm ring-2 ring-accent/30 transition hover:bg-accent-dark hover:ring-accent/50 ${
        compact ? "px-2.5 py-1.5 text-xs" : "px-3.5 py-2 text-sm"
      }`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
      </span>
      {navHighlight.label}
      {!compact && navHighlight.badge ? (
        <span className="rounded bg-brand-dark px-1.5 py-0.5 text-[10px] font-bold text-accent">{navHighlight.badge}</span>
      ) : null}
    </Link>
  );
}

// PC 드롭다운 (마우스 오버 + 클릭 둘 다 지원 → 태블릿 터치 대응)
function DesktopDropdown({ item, pathname }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const timer = useRef(null);
  const active = item.children.some((c) => isActive(pathname, c.href));

  useEffect(() => {
    if (!open) return;
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const esc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const enter = () => { clearTimeout(timer.current); setOpen(true); };
  const leave = () => { timer.current = setTimeout(() => setOpen(false), 120); };

  return (
    <div ref={ref} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-semibold transition ${
          active || open ? "text-brand" : "text-muted hover:text-brand"
        }`}
      >
        {item.label}
        <Chevron open={open} />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-2">
          <div className="overflow-hidden rounded-xl border border-black/10 bg-white p-1.5 shadow-xl">
            {item.children.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3.5 py-2.5 transition hover:bg-brand/5 ${
                  isActive(pathname, c.href) ? "bg-brand/5" : ""
                }`}
              >
                <span className={`block text-sm font-bold ${isActive(pathname, c.href) ? "text-brand" : "text-ink"}`}>
                  {c.label}
                </span>
                {c.desc ? <span className="mt-0.5 block text-xs text-muted">{c.desc}</span> : null}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null); // 모바일 하위메뉴 펼침
  const pathname = usePathname();
  const closeAll = () => { setOpen(false); setExpanded(null); };

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-3">
        <Link href="/" className="flex flex-col leading-none" onClick={closeAll}>
          <span className="text-lg font-extrabold text-brand">{site.brandName}</span>
          <span className="text-[11px] font-medium text-muted">{site.companyName}</span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <DesktopDropdown key={item.label} item={item} pathname={pathname} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-semibold transition ${
                  isActive(pathname, item.href) ? "text-brand" : "text-muted hover:text-brand"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
          <div className="ml-2 flex items-center gap-2">
            <HighlightButton />
            <Link href="/contact" className="whitespace-nowrap rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-light">
              빌딩 문의
            </Link>
          </div>
        </nav>

        {/* 모바일: 강조 버튼 + 햄버거 */}
        <div className="flex items-center gap-2 lg:hidden">
          <HighlightButton compact onClick={closeAll} />
          <button
            type="button"
            aria-label="메뉴 열기"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-brand"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 패널 */}
      {open && (
        <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-black/5 bg-white lg:hidden">
          <div className="container-x flex flex-col py-2">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    type="button"
                    aria-expanded={expanded === item.label}
                    onClick={() => setExpanded((v) => (v === item.label ? null : item.label))}
                    className="flex w-full items-center justify-between rounded-md px-2 py-3 text-left text-base font-semibold text-ink hover:bg-black/5"
                  >
                    {item.label}
                    <Chevron open={expanded === item.label} />
                  </button>
                  {expanded === item.label && (
                    <div className="mb-1 ml-2 border-l-2 border-accent/40 pl-3">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={closeAll}
                          className={`block rounded-md px-2 py-2.5 text-[15px] font-semibold hover:bg-black/5 ${
                            isActive(pathname, c.href) ? "text-brand" : "text-muted"
                          }`}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAll}
                  className="rounded-md px-2 py-3 text-base font-semibold text-ink hover:bg-black/5"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
