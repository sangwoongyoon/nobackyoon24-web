import MapEmbed from "./MapEmbed";

// 프로젝트(중개 실적) 카드 한 장. 데이터는 src/data/projects.js 에서 옵니다.
export default function ProjectCard({ project }) {
  const { title, date, region, spec, price, mapQuery, comment } = project;
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition hover:shadow-md">
      {/* 지도 */}
      <MapEmbed query={mapQuery} height={200} />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
            {region}
          </span>
          <span className="text-xs font-medium text-muted">{date}</span>
        </div>

        <h3 className="mt-3 text-lg font-bold text-ink">{title}</h3>

        <dl className="mt-3 space-y-1.5 text-sm text-muted">
          <div className="flex gap-2">
            <dt className="w-12 shrink-0 font-semibold text-ink/70">토지</dt>
            <dd>{spec.land}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-12 shrink-0 font-semibold text-ink/70">건물</dt>
            <dd>{spec.building}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-12 shrink-0 font-semibold text-ink/70">규모</dt>
            <dd>{spec.scale}</dd>
          </div>
        </dl>

        <div className="mt-4 border-t border-black/5 pt-3">
          <span className="text-xs text-muted">거래금액</span>
          <div className="text-xl font-extrabold text-brand">{price}</div>
        </div>

        {comment ? (
          <blockquote className="mt-4 rounded-lg bg-accent/10 p-3 text-sm italic text-ink/80">
            “{comment}”
          </blockquote>
        ) : null}
      </div>
    </article>
  );
}
