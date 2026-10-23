"use client";

import { usePathname } from "next/navigation";
import { site } from "@/data/site";

// 모바일 하단 고정: 전화 / 카카오톡 상담 (PC에서는 숨김)
// 세미나 페이지는 자체 '무료 신청' 하단 버튼이 있어서 제외
export default function MobileContactBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/seminar")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 px-3 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2.5 backdrop-blur lg:hidden">
      <div className="grid grid-cols-2 gap-2.5">
        <a
          href={site.contact.phoneHref}
          className="flex items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-base font-extrabold text-white active:scale-[.98]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 013 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" /></svg>
          전화 상담
        </a>
        <a
          href={site.contact.kakaoOpenChatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#FEE500] py-3.5 text-base font-extrabold text-[#191919] active:scale-[.98]"
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.5 3 2 6.5 2 10.8c0 2.8 1.9 5.2 4.7 6.6l-1 3.6c-.1.3.3.6.6.4l4.2-2.8c.5.1 1 .1 1.5.1 5.5 0 10-3.5 10-7.9S17.5 3 12 3z" /></svg>
          카톡 상담
        </a>
      </div>
    </div>
  );
}
