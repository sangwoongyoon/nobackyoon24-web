import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/board/JsonLd";
import { boards, getPosts, getPost, formatDate, toDateString } from "@/lib/posts";
import { site } from "@/data/site";

const base = () => `https://www.${site.domain}`;

// 상세 페이지 메타데이터 (title / description / canonical / OG)
export function postMetadata(board, slug) {
  const p = getPost(board, slug);
  if (!p) return {};
  const url = `${base()}${boards[board].href}/${p.slug}`;
  return {
    title: p.title,
    description: p.description,
    keywords: p.tags,
    alternates: { canonical: url },
    openGraph: {
      title: p.title,
      description: p.description,
      type: "article",
      url,
      locale: "ko_KR",
      publishedTime: p.date,
      modifiedTime: p.updated,
      authors: [site.personName],
      images: p.thumbnail ? [p.thumbnail] : undefined,
    },
  };
}

// 매각사례 거래 정보 항목 (frontmatter deal: 아래 키)
const DEAL_FIELDS = [
  ["location", "위치"],
  ["price", "거래금액"],
  ["pricePerPyeong", "토지 평단가"],
  ["buildingPerPyeong", "연면적 평단가"],
  ["landArea", "대지면적"],
  ["buildingArea", "연면적"],
  ["zoning", "용도지역"],
  ["builtYear", "준공연도"],
  ["buyerType", "매수 주체"],
  ["dealDate", "거래 시점"],
];

export default function BoardPost({ board, slug }) {
  const b = boards[board];
  const p = getPost(board, slug);
  if (!p) notFound();

  const url = `${base()}${b.href}/${p.slug}`;
  const author = {
    "@type": "Person",
    name: site.personName,
    jobTitle: `${site.companyName} ${site.role}`,
    url: `${base()}/about`,
    worksFor: { "@type": "RealEstateAgent", name: site.companyName, url: base() },
  };
  const related = getPosts(board).filter((x) => x.slug !== p.slug).slice(0, 3);

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": b.schemaType,
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      dateModified: p.updated,
      inLanguage: "ko-KR",
      mainEntityOfPage: url,
      author,
      publisher: { "@type": "Organization", name: site.companyName, url: base() },
      image: p.thumbnail ? [`${base()}${p.thumbnail}`] : undefined,
      keywords: p.tags.join(", ") || undefined,
      ...(p.source ? { isBasedOn: p.source.url } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: base() },
        { "@type": "ListItem", position: 2, name: b.label, item: `${base()}${b.href}` },
        { "@type": "ListItem", position: 3, name: p.title, item: url },
      ],
    },
  ];
  if (p.faq.length) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: p.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  const deal = p.deal || {};
  const dealRows = DEAL_FIELDS.filter(([k]) => deal[k]);

  return (
    <>
      <JsonLd data={ld} />

      <article className="container-x max-w-3xl py-12 sm:py-16">
        {/* 브레드크럼 */}
        <nav aria-label="breadcrumb" className="text-sm text-muted">
          <Link href="/" className="hover:text-brand">홈</Link>
          <span className="mx-2">/</span>
          <Link href={b.href} className="hover:text-brand">{b.label}</Link>
        </nav>

        <header className="mt-5 border-b border-black/10 pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {p.draft ? (
              <span className="rounded bg-red-100 px-1.5 py-0.5 font-semibold text-red-700">초안 (배포 시 숨김)</span>
            ) : null}
            {p.category ? (
              <span className="rounded-full bg-brand/10 px-2.5 py-1 font-semibold text-brand">{p.category}</span>
            ) : null}
          </div>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">{p.title}</h1>
          {p.description ? <p className="mt-4 text-lg leading-relaxed text-muted">{p.description}</p> : null}
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <span className="font-semibold text-ink">{site.personName} {site.role}</span>
            <span>·</span>
            <time dateTime={p.date}>{formatDate(p.date)}</time>
            {p.updated && p.updated !== p.date ? (
              <>
                <span>·</span>
                <span>수정 <time dateTime={p.updated}>{formatDate(p.updated)}</time></span>
              </>
            ) : null}
            <span>·</span>
            <span>{p.readingMinutes}분 읽기</span>
          </div>
        </header>

        {/* 핵심 요약 — AI 개요/검색 스니펫이 인용하기 좋은 짧은 결론 */}
        {p.summary.length ? (
          <section className="mt-8 rounded-xl border-l-4 border-accent bg-accent/10 p-6">
            <h2 className="text-base font-bold text-brand">핵심 요약</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-ink">
              {p.summary.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </section>
        ) : null}

        {/* 매각사례 거래 정보 표 */}
        {dealRows.length ? (
          <section className="mt-8 overflow-hidden rounded-xl border border-black/10">
            <h2 className="bg-brand px-5 py-3 text-sm font-bold text-white">거래 개요</h2>
            <table className="w-full text-sm">
              <tbody>
                {dealRows.map(([k, label]) => (
                  <tr key={k} className="border-t border-black/5">
                    <th scope="row" className="w-36 bg-black/[0.02] px-5 py-3 text-left font-semibold text-ink/70">{label}</th>
                    <td className="px-5 py-3 text-ink">{deal[k]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}

        {p.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.thumbnail} alt={p.title} className="mt-8 w-full rounded-xl" />
        ) : null}

        {/* 본문 */}
        <div className="post-body mt-10" dangerouslySetInnerHTML={{ __html: p.html }} />

        {/* 뉴스 출처 */}
        {p.source ? (
          <p className="mt-8 rounded-lg bg-black/[0.03] px-4 py-3 text-sm text-muted">
            출처:{" "}
            <a href={p.source.url} target="_blank" rel="noopener noreferrer nofollow" className="font-semibold text-brand underline">
              {p.source.name}
            </a>
            {p.source.date ? ` (${formatDate(toDateString(p.source.date))})` : ""}
          </p>
        ) : null}

        {/* 자주 묻는 질문 */}
        {p.faq.length ? (
          <section className="mt-12">
            <h2 className="text-2xl font-extrabold text-ink">자주 묻는 질문</h2>
            <div className="mt-5 divide-y divide-black/10 rounded-xl border border-black/10">
              {p.faq.map((f) => (
                <div key={f.q} className="p-5">
                  <h3 className="font-bold text-brand">Q. {f.q}</h3>
                  <p className="mt-2 leading-relaxed text-ink/90">A. {f.a}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {p.tags.length ? (
          <div className="mt-10 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full border border-black/10 px-3 py-1 text-xs text-muted">#{t}</span>
            ))}
          </div>
        ) : null}

        {/* 작성자 (전문성·신뢰 신호) */}
        <aside className="mt-12 rounded-xl bg-brand p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">작성자</p>
          <p className="mt-2 text-lg font-extrabold">{site.brandName}</p>
          <p className="mt-1 text-sm text-white/75">{site.companyName} {site.role} · {site.slogan}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">빌딩 문의하기</Link>
            <Link href="/about" className="btn-outline">내소개 보기</Link>
          </div>
        </aside>

        {related.length ? (
          <section className="mt-14">
            <h2 className="text-xl font-extrabold text-ink">다른 {b.label}</h2>
            <ul className="mt-4 divide-y divide-black/10 border-y border-black/10">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`${b.href}/${r.slug}`} className="flex items-center justify-between gap-4 py-4 hover:text-brand">
                    <span className="font-semibold">{r.title}</span>
                    <time className="shrink-0 text-sm text-muted" dateTime={r.date}>{formatDate(r.date)}</time>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </>
  );
}
