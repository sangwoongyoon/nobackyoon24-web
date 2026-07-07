import Link from "next/link";
import { site } from "@/data/site";

// 공인중개사법상 필수 표기를 푸터에 고정 노출합니다.
export default function Footer() {
  const L = site.legal;
  return (
    <footer className="mt-20 border-t border-black/10 bg-brand-dark text-white/80">
      <div className="container-x py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <div className="text-lg font-extrabold text-white">{site.brandName}</div>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">
              {site.slogan}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/about" className="hover:text-white">내소개</Link>
            <Link href="/projects" className="hover:text-white">프로젝트</Link>
            <Link href="/contact" className="hover:text-white">문의</Link>
            <Link href="/careers" className="hover:text-white">입사지원</Link>
            <Link href="/privacy" className="hover:text-white">개인정보처리방침</Link>
          </nav>
        </div>

        {/* ===== 공인중개사법 필수 표기 (수정 금지 아님, site.js에서 값만 채우세요) ===== */}
        <div className="mt-10 border-t border-white/15 pt-6 text-xs leading-relaxed text-white/60">
          <p>
            <span className="font-semibold text-white/80">{L.officeName}</span>
            {"  |  "}대표자 {L.ceo}
            {"  |  "}등록번호 {L.registrationNo}
          </p>
          <p className="mt-1">
            소재지 {L.address}
            {"  |  "}연락처 {L.phone}
          </p>
          <p className="mt-1">
            사업자등록번호 {L.businessNo}
            {"  |  "}개업공인중개사 {L.brokerName}
          </p>
          <p className="mt-4 text-white/40">
            © {new Date().getFullYear()} {site.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
