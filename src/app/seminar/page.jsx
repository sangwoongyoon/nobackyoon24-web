import VideoGallery from "@/components/VideoGallery";
import SeminarPopup from "@/components/SeminarPopup";
import { seminar } from "@/data/seminar";
import { site } from "@/data/site";

const desc = `${seminar.heroCopy.join(" ")} 2026.11.22(일) 13:00~15:00 · 무료 · 선착순 20명. 현직 멘토 3인이 빌딩중개의 현실과 실전 노하우를 직접 공개합니다.`;

export const metadata = {
  title: "채용세미나 2기",
  description: desc,
  openGraph: {
    title: "원빌딩 채용 세미나 2기 | 11월 22일(일)",
    description: desc,
    url: "/seminar",
  },
};

function ApplyButton({ children, className = "btn-primary" }) {
  if (seminar.status !== "open") {
    return <span className={`${className} pointer-events-none opacity-60`}>신청 마감</span>;
  }
  return (
    <a href={seminar.applyUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {children || "무료 세미나 신청하기"}
    </a>
  );
}

function SectionHead({ en, title, desc, dark = false }) {
  return (
    <div className="max-w-2xl">
      <p className={`eyebrow ${dark ? "text-accent" : ""}`}>{en}</p>
      <h2 className={`mt-2 text-2xl font-extrabold leading-snug sm:text-3xl ${dark ? "text-white" : "text-ink"}`}>
        {Array.isArray(title) ? title.map((t) => <span key={t} className="block">{t}</span>) : title}
      </h2>
      {desc ? <p className={`mt-3 leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{desc}</p> : null}
    </div>
  );
}

export default function SeminarPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "2026 원빌딩 채용 세미나 2기",
    description: desc,
    startDate: "2026-11-22T13:00:00+09:00",
    endDate: "2026-11-22T15:00:00+09:00",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    isAccessibleForFree: true,
    maximumAttendeeCapacity: 20,
    location: {
      "@type": "Place",
      name: "원빌딩 본관",
      address: { "@type": "PostalAddress", streetAddress: "서울 강남구 신사동 590-16", addressCountry: "KR" },
    },
    organizer: { "@type": "Organization", name: site.companyName, url: `https://www.${site.domain}` },
    offers: { "@type": "Offer", price: 0, priceCurrency: "KRW", url: seminar.applyUrl },
  };

  const storiesLive = seminar.storiesStatus === "live";

  return (
    <>
      <SeminarPopup onSeminarPage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 01 HERO */}
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand to-brand-light/80" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="container-x relative py-16 sm:py-24">
          <p className="text-lg font-semibold leading-snug text-white/85 sm:text-2xl">
            {seminar.heroCopy[0]}
            <span className="mt-1 block text-accent">{seminar.heroCopy[1]}</span>
          </p>

          <div className="mt-10 border-l-2 border-accent pl-5">
            <p className="text-sm font-bold tracking-[0.25em] text-accent">{seminar.eyebrow}</p>
            <h1 className="mt-1 text-4xl font-extrabold sm:text-6xl">{seminar.title}</h1>
          </div>

          <div className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-3">
            <div>
              <p className="text-2xl font-extrabold tabular-nums sm:text-4xl">{seminar.dateLabel}</p>
              <p className="text-lg font-semibold tabular-nums text-white/80 sm:text-xl">{seminar.timeLabel}</p>
            </div>
            <div className="flex gap-2 pb-1">
              {seminar.conditions.map((c) => (
                <span key={c} className="rounded-full border border-accent/60 px-3 py-1 text-sm font-bold text-accent">{c}</span>
              ))}
            </div>
          </div>

          <div className="mt-9">
            <ApplyButton className="btn-primary px-8 py-4 text-lg" />
            <p className="mt-3 text-sm text-white/70">✓ {seminar.heroNote}</p>
          </div>
        </div>
      </section>

      {/* 02 WHY WONBUILDING */}
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <SectionHead en="Why Wonbuilding" title={seminar.why.title} desc={seminar.why.desc} />
          <div className="grid grid-cols-3 gap-3">
            {seminar.why.stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-black/10 bg-white px-2 py-4 text-center shadow-sm sm:p-6">
                <div className="text-base font-extrabold text-brand sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs text-muted sm:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 PROVEN EXPERIENCE */}
      <section className="bg-[#F7F5EF]">
        <div className="container-x py-16 sm:py-20">
          <p className="eyebrow">Proven Experience · 1기</p>
          <h2 className="mt-3 text-2xl font-extrabold leading-snug text-ink sm:text-4xl">
            {seminar.proven.title.map((t, i) => (
              <span key={t} className={`block ${i === 1 ? "text-brand" : ""}`}>{t}</span>
            ))}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">{seminar.proven.desc}</p>
        </div>
      </section>

      {/* 04 MEET YOUR MENTORS */}
      <section className="section">
        <div className="container-x">
          <SectionHead en="Meet Your Mentors" title="멘토 3인" desc="현장에서 직접 성과를 만든 세 사람이 각자의 시작과 성장을 이야기합니다." />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {seminar.mentors.map((m) => (
              <article key={m.name} className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
                <div className="relative aspect-[4/5] bg-gradient-to-b from-[#EEF1F5] to-[#DDE3EA]">
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.photo} alt={`${m.name} ${m.role}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-24 w-24 items-center justify-center rounded-full bg-brand text-4xl font-extrabold text-accent">
                        {m.name.slice(0, 1)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/90 to-transparent p-5 pt-16">
                    <p className="text-xl font-extrabold text-white">
                      {m.name} <span className="text-base font-semibold text-white/75">{m.role}</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-extrabold text-brand">{m.headline}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">{m.copy}</p>
                  <ul className="mt-4 space-y-1.5 border-t border-black/5 pt-4 text-sm text-muted">
                    {m.points.map((p) => (
                      <li key={p} className="flex gap-2"><span className="text-accent-dark">·</span>{p}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">※ {seminar.mentorNote}</p>
        </div>
      </section>

      {/* 05 WHAT YOU WILL EXPERIENCE */}
      <section className="section bg-black/[0.02]">
        <div className="container-x">
          <SectionHead en="What You Will Experience" title="듣고, 묻고, 직접 확인하는 2시간" desc="단순한 강연이 아닙니다. 직접 보고 질문하고 상담하는 자리입니다." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {seminar.program.map((p, i) => (
              <div key={p.title} className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
                <span className="text-sm font-extrabold text-accent-dark">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 REAL STORIES */}
      <section id="reviews" className="section scroll-mt-16 bg-brand-dark text-white">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHead dark en="Real Stories · 1기 입사자 인터뷰" title="그들이 원빌딩을 선택한 진짜 이유" />
            <span className="w-fit shrink-0 rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-brand-dark">
              {storiesLive ? "공개 중" : seminar.storiesReleaseLabel}
            </span>
          </div>
          <div className="mt-10">
            <VideoGallery videos={seminar.videos} pendingLabel={storiesLive ? "곧 공개" : "11/8 공개"} />
          </div>
        </div>
      </section>

      {/* 07 WHO SHOULD ATTEND */}
      <section className="section">
        <div className="container-x">
          <SectionHead en="Who Should Attend" title="이런 분들께 추천합니다" desc="공인중개사 자격증은 필수가 아닙니다." />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {seminar.forWho.map((w) => (
              <div key={w.title} className="flex gap-3 rounded-xl bg-brand/5 p-5">
                <span className="font-bold text-accent-dark">✓</span>
                <div>
                  <p className="font-bold text-ink">{w.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 EVENT DETAILS */}
      <section className="section border-t border-black/5 bg-[#F7F5EF]">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHead en="Event Details" title="행사 안내" />
            <a href={seminar.mapUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6">
              지도에서 위치 보기
            </a>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              문의 · {seminar.contact.name}
              <br />
              <a href={`tel:${seminar.contact.phone.replace(/-/g, "")}`} className="font-semibold text-brand">{seminar.contact.phone}</a>
              {" · "}
              <a href={`mailto:${seminar.contact.email}`} className="font-semibold text-brand">{seminar.contact.email}</a>
            </p>
          </div>
          <dl className="divide-y divide-black/10 rounded-2xl border border-black/10 bg-white">
            {seminar.details.map((d) => (
              <div key={d.label} className="grid grid-cols-[72px_1fr] gap-3 px-5 py-4 sm:grid-cols-[96px_1fr]">
                <dt className="text-sm font-bold text-accent-dark">{d.label}</dt>
                <dd className="text-sm font-semibold text-ink sm:text-base">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 09 FAQ */}
      <section className="section">
        <div className="container-x max-w-3xl">
          <SectionHead en="FAQ" title="자주 묻는 질문" />
          <div className="mt-6 divide-y divide-black/10 rounded-xl border border-black/10 bg-white">
            {seminar.faq.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink">
                  {f.q}
                  <span className="text-xl text-accent-dark transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10 FINAL CTA */}
      <section className="bg-brand-dark text-white">
        <div className="container-x py-16 text-center sm:py-20">
          <h2 className="text-2xl font-extrabold leading-snug sm:text-4xl">{seminar.finalCta.title}</h2>
          <p className="mt-5 text-xl font-extrabold tabular-nums text-accent sm:text-2xl">
            2026.11.22(일) 13:00–15:00
          </p>
          <p className="mt-2 text-white/80">참가비 무료 · 선착순 20명 · 자격증 없어도 참여 가능</p>
          <div className="mt-8">
            <ApplyButton className="btn-primary px-8 py-4 text-lg">{seminar.finalCta.button}</ApplyButton>
          </div>
        </div>
      </section>

      {/* 모바일 하단 고정 신청 버튼 */}
      <div className="h-20 lg:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-extrabold text-brand">11.22(일) 13:00 채용세미나</p>
            <p className="text-xs text-muted">무료 · 선착순 20명</p>
          </div>
          <ApplyButton className="btn-primary shrink-0 px-5 py-2.5 text-sm">무료 신청하기</ApplyButton>
        </div>
      </div>
    </>
  );
}
