import Link from "next/link";
import PageHero from "@/components/PageHero";
import { about, site } from "@/data/site";

export const metadata = { title: "내소개" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={site.brandName}
        description={about.oneLiner}
      />

      <section className="section">
        <div className="container-x max-w-3xl">
          {about.body.map((p, i) => (
            <p key={i} className="mb-5 text-lg leading-relaxed text-ink/90">
              {p}
            </p>
          ))}

          <h2 className="mt-14 text-2xl font-extrabold text-ink">강점 3가지</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {about.strengths.map((s, i) => (
              <div key={s.title} className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="text-3xl font-extrabold text-accent">{`0${i + 1}`}</div>
                <h3 className="mt-3 text-lg font-bold text-brand">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col gap-3 sm:flex-row">
            <Link href="/projects" className="btn-ghost">프로젝트 보기</Link>
            <Link href="/contact" className="btn-primary">문의하기</Link>
          </div>
        </div>
      </section>
    </>
  );
}
