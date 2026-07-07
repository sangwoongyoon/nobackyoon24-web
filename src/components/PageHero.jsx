// 하위 페이지 상단 공통 헤더 배너
export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="bg-brand text-white">
      <div className="container-x py-14 sm:py-16">
        {eyebrow ? <p className="eyebrow text-accent">{eyebrow}</p> : null}
        <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/80">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
