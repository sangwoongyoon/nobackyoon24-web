import Link from "next/link";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { careers } from "@/data/site";

export const metadata = { title: "입사지원" };

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="중개사 합류 문의"
        description={careers.headline}
      />

      <section className="section">
        <div className="container-x max-w-3xl">
          <p className="text-lg leading-relaxed text-ink/90">{careers.intro}</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-brand">이런 분을 찾습니다</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {careers.weWant.map((w) => (
                  <li key={w} className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-brand">이런 걸 제공합니다</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {careers.weOffer.map((w) => (
                  <li key={w} className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 rounded-2xl bg-brand/5 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink">지원 방법</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{careers.applyGuide}</p>

            <div className="mt-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <ContactForm defaultType="recruit" />
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/about" className="btn-ghost">먼저 윤이사 소개 보기</Link>
          </div>
        </div>
      </section>
    </>
  );
}
