import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import VideoGallery from "@/components/VideoGallery";
import { seminar } from "@/data/seminar";
import { site } from "@/data/site";

export const metadata = {
  title: "채용세미나",
  description: `${seminar.title} — ${seminar.headline}`,
  openGraph: {
    title: `${seminar.title} | ${site.companyName}`,
    description: seminar.headline,
  },
};

function ApplyButton({ className = "btn-primary" }) {
  if (seminar.status !== "open") {
    return <span className={`${className} pointer-events-none opacity-60`}>신청 마감</span>;
  }
  return seminar.applyUrl ? (
    <a href={seminar.applyUrl} target="_blank" rel="noopener noreferrer" className={className}>
      세미나 신청하기
    </a>
  ) : (
    <a href="#apply" className={className}>세미나 신청하기</a>
  );
}

export default function SeminarPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: seminar.title,
    description: seminar.intro,
    startDate: "2026-11-28T13:30:00+09:00",
    endDate: "2026-11-28T15:30:00+09:00",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    isAccessibleForFree: true,
    location: {
      "@type": "Place",
      name: "원빌딩 본관",
      address: { "@type": "PostalAddress", streetAddress: site.legal.address, addressCountry: "KR" },
    },
    organizer: { "@type": "Organization", name: site.companyName, url: `https://www.${site.domain}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ===================== 히어로 ===================== */}
      <section className="relative overflow-hidden bg-brand text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand to-brand-light opacity-95" />
        <div className="container-x relative py-16 sm:py-24">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-brand-dark">
              {seminar.status === "open" ? "신청 접수중" : "신청 마감"}
            </span>
            <span className="eyebrow text-accent">Recruiting Seminar · {seminar.cohort}</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-5xl">{seminar.title}</h1>
          <p className="mt-3 text-lg font-semibold text-accent sm:text-2xl">{seminar.headline}</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80">{seminar.intro}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ApplyButton />
            <a href="#reviews" className="btn-outline">1기 입사자 후기 보기</a>
          </div>
        </div>
      </section>

      {/* ===================== 기본 정보 ===================== */}
      <section className="border-b border-black/5 bg-white">
        <div className="container-x grid grid-cols-2 gap-px overflow-hidden py-0 lg:grid-cols-4">
          {seminar.info.map((it) => (
            <div key={it.label} className="py-8 pr-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-dark">{it.label}</p>
              <p className="mt-1.5 text-lg font-extrabold text-brand sm:text-xl">{it.value}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">{it.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== 이런 분께 / 얻어가는 것 ===================== */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="eyebrow">For You</p>
            <h2 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">이런 분께 추천합니다</h2>
            <ul className="mt-6 space-y-3">
              {seminar.forWho.map((w) => (
                <li key={w} className="flex gap-3 rounded-lg bg-brand/5 px-4 py-3 text-sm leading-relaxed text-ink sm:text-base">
                  <span className="font-bold text-accent-dark">✓</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Takeaways</p>
            <h2 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">세미나에서 얻어가는 것</h2>
            <div className="mt-6 grid gap-4">
              {seminar.takeaways.map((t, i) => (
                <div key={t.title} className="flex gap-4 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
                  <span className="text-2xl font-extrabold text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-bold text-brand">{t.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 1기 리뷰영상 ===================== */}
      <section id="reviews" className="section scroll-mt-16 bg-brand-dark text-white">
        <div className="container-x">
          <p className="eyebrow text-accent">1기 입사자 인터뷰</p>
          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">먼저 와 본 사람들의 이야기</h2>
          <p className="mt-3 max-w-2xl text-white/70">
            {seminar.firstCohort.date} 1기 세미나를 듣고 원빌딩에 합류한 분들이 직접 이야기합니다.
          </p>

          <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
            {seminar.firstCohort.stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-extrabold text-accent sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs text-white/60 sm:text-sm">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <VideoGallery videos={seminar.videos} />
          </div>
        </div>
      </section>

      {/* ===================== 프로그램 & 발표자 ===================== */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Program</p>
            <h2 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">당일 프로그램</h2>
            <ol className="mt-6 border-l-2 border-brand/15">
              {seminar.program.map((p) => (
                <li key={p.time + p.title} className="relative pb-5 pl-6 last:pb-0">
                  <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-accent" />
                  <span className="text-sm font-bold tabular-nums text-accent-dark">{p.time}</span>
                  <p className="font-bold text-ink">{p.title}</p>
                  {p.desc ? <p className="mt-0.5 text-sm text-muted">{p.desc}</p> : null}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="eyebrow">Speakers</p>
            <h2 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">발표 팀장</h2>
            <div className="mt-6 grid gap-4">
              {seminar.speakers.map((s) => (
                <div key={s.name} className="flex items-start gap-4 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-extrabold text-accent">
                    {s.name.slice(0, 1)}
                  </div>
                  <div>
                    <p className="font-bold text-ink">
                      {s.name} <span className="text-sm font-semibold text-muted">{s.role}</span>
                    </p>
                    {s.keyword ? (
                      <span className="mt-1 inline-block rounded bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent-dark">
                        {s.keyword}
                      </span>
                    ) : null}
                    {s.desc ? <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.desc}</p> : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 rounded-xl bg-brand/5 p-5 text-center">
              {seminar.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-extrabold text-brand">{s.value}</div>
                  <div className="mt-0.5 text-xs text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="section border-t border-black/5 bg-black/[0.02]">
        <div className="container-x max-w-3xl">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">자주 묻는 질문</h2>
          <div className="mt-6 divide-y divide-black/10 rounded-xl border border-black/10 bg-white">
            {seminar.faq.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink">
                  {f.q}
                  <span className="text-accent-dark transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 신청 ===================== */}
      <section id="apply" className="section scroll-mt-16">
        <div className="container-x max-w-3xl">
          <div className="rounded-2xl bg-brand p-6 text-white sm:p-10">
            <p className="eyebrow text-accent">Apply</p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">{seminar.title} 신청</h2>
            <p className="mt-2 text-white/75">
              {seminar.info[0].value} · {seminar.info[1].value} · 참가비 {seminar.info[2].value}
            </p>

            {seminar.applyUrl ? (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ApplyButton />
                <a href={site.contact.kakaoOpenChatUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  카카오톡 문의
                </a>
              </div>
            ) : (
              <div className="mt-6 rounded-xl bg-white p-6 text-ink">
                <ContactForm defaultType="seminar" />
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <Link href="/careers" className="btn-ghost">상시 입사지원 바로가기</Link>
          </div>
        </div>
      </section>
    </>
  );
}
