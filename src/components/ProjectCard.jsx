/* eslint-disable @next/next/no-img-element */
import SmartPhoto from "./SmartPhoto";

// 프로젝트(중개 실적) 카드 — 사진 | 지도 | 정보
export default function ProjectCard({ project }) {
  const { dong, type, price, region, mapQuery, land, building, date, mapImg } = project;
  const kakaoUrl = `https://map.kakao.com/?q=${encodeURIComponent(mapQuery)}`;
  // 사진 파일명 = 주소에서 시·구를 뺀 "동 지번" (예: "삼성동 41-16")
  const photoName = mapQuery.split(" ").slice(2).join(" ");

  return (
    <article className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition hover:shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* 건물 사진 */}
        <div className="relative bg-black/5">
          <SmartPhoto name={photoName} alt={`${region} ${dong} 건물`} />
        </div>

        {/* 지도 */}
        <div className="relative border-y border-black/5 md:border-x md:border-y-0">
          {mapImg ? (
            <img src={mapImg} alt={`${region} ${dong} 위치`} loading="lazy" className="h-56 w-full object-cover md:h-full" />
          ) : (
            <a
              href={kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-56 flex-col items-center justify-center gap-2 bg-brand/5 text-brand md:h-full"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-5.2-7-11a7 7 0 1114 0c0 5.8-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.4" />
              </svg>
              <span className="text-xs font-semibold">카카오맵에서 보기</span>
            </a>
          )}
        </div>

        {/* 정보 */}
        <div className="flex flex-col justify-center gap-3 p-6">
          <span className="inline-block w-fit rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
            {type || "거래"}
          </span>
          <div className="text-2xl font-extrabold text-brand">{price}</div>

          <dl className="space-y-1.5 text-sm">
            <Row label="주소" value={`${region} ${dong}`} />
            <Row label="토지면적" value={land} />
            <Row label="건물면적" value={building || "-"} />
            <Row label="거래일자" value={date} />
          </dl>
        </div>
      </div>
    </article>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex gap-3">
      <dt className="w-16 shrink-0 font-semibold text-ink/60">{label}</dt>
      <dd className="text-ink/90">{value}</dd>
    </div>
  );
}
