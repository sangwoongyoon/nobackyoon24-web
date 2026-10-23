import Link from "next/link";
import { home, about, site } from "@/data/site";
import SeminarPopup from "@/components/SeminarPopup";

export default function HomePage() {
  return (
    <>
      <SeminarPopup />
      {/* ===================== 히어로 ===================== */}
      <section className="relative overflow-hidden bg-brand text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand to-brand-light opacity-95" />
        <div className="container-x relative py-14 sm:py-32">
          <p className="eyebrow text-accent">{site.companyName}</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-6xl">
            {home.heroTitle}
          </h1>
          <p className="mt-3 text-xl font-semibold text-accent sm:text-2xl">
            {home.heroSubtitle}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {home.heroDescription}
          </p>

          {/* CTA 2트랙 */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={home.ctaPrimary.href} className="btn-primary">
              {home.ctaPrimary.label}
            </Link>
            <Link href={home.ctaSecondary.href} className="btn-outline">
              {home.ctaSecondary.label}
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== 바로가기 (리틀리 대체) ===================== */}
      <section className="border-b border-black/5 bg-white">
        <div className="container-x grid grid-cols-2 gap-3 py-6 sm:grid-cols-4">
          {[
            { label: "채용세미나 2기", sub: "11.28(토) 무료 신청", href: "https://forms.gle/xRt9vkXuRKG3fWh36", ext: true, hot: true },
            { label: "매입·매각 상담", sub: "카카오톡 1:1", href: site.contact.kakaoOpenChatUrl, ext: true },
            { label: "매수·매도 프로젝트", sub: "진행 중인 물건", href: "/projects" },
            { label: "네이버 블로그", sub: "부동산 투자의 모든 것", href: site.contact.naverBlogUrl, ext: true },
          ].map((q) => (
            <a
              key={q.label}
              href={q.href}
              {...(q.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`group rounded-xl border p-4 transition hover:-translate-y-0.5 hover:shadow-md ${
                q.hot ? "border-accent bg-accent/10" : "border-black/10 bg-white"
              }`}
            >
              <span className="block text-[15px] font-extrabold leading-snug text-ink">{q.label}</span>
              <span className="mt-1 flex items-center justify-between text-xs text-muted">
                {q.sub}
                <span className="text-brand transition group-hover:translate-x-0.5">→</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ===================== 신뢰 지표 ===================== */}
      <section className="border-b border-black/5 bg-white">
        <div className="container-x grid grid-cols-1 gap-6 py-12 sm:grid-cols-3">
          {home.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-brand sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== 소개 요약 ===================== */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Who</p>
            <h2 className="mt-2 text-3xl font-extrabold text-ink">
              {site.brandName}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{about.oneLiner}</p>
            <p className="mt-4 leading-relaxed text-muted">{about.body[0]}</p>
            <Link href="/about" className="btn-ghost mt-8">
              내소개 자세히 보기
            </Link>
          </div>

          <div className="grid gap-4">
            {about.strengths.map((s) => (
              <div key={s.title} className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-brand">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 하단 CTA ===================== */}
      <section className="bg-brand-dark text-white">
        <div className="container-x flex flex-col items-start justify-between gap-6 py-16 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              강남 빌딩, 숫자로 확인하세요.
            </h2>
            <p className="mt-2 text-white/75">매도·매수·중개사 합류 문의 모두 환영합니다.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">빌딩 문의하기</Link>
            <Link href="/careers" className="btn-outline">중개사 합류 문의</Link>
          </div>
        </div>
      </section>
    </>
  );
}
