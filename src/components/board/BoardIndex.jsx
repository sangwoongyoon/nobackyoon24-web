import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/board/JsonLd";
import { boards, getPosts, formatDate } from "@/lib/posts";
import { site } from "@/data/site";

// 게시판 목록 페이지 (매각사례 / 칼럼 / 부동산뉴스 공통)
export default function BoardIndex({ board }) {
  const b = boards[board];
  const posts = getPosts(board);
  const base = `https://www.${site.domain}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: b.title,
          description: b.description,
          url: `${base}${b.href}`,
          inLanguage: "ko-KR",
          publisher: { "@type": "Organization", name: site.companyName, url: base },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: posts.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${base}${b.href}/${p.slug}`,
              name: p.title,
            })),
          },
        }}
      />

      <PageHero eyebrow={b.eyebrow} title={b.title} description={b.description} />

      <section className="section">
        <div className="container-x">
          {posts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-black/15 py-20 text-center">
              <p className="text-lg font-semibold text-ink">첫 글을 준비하고 있습니다.</p>
              <p className="mt-2 text-sm text-muted">곧 업로드됩니다.</p>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} href={`${b.href}/${p.slug}`} board={board} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

function PostCard({ post, href, board }) {
  const deal = post.deal || {};
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {post.thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.thumbnail} alt={post.title} className="aspect-[16/10] w-full object-cover" loading="lazy" />
      ) : (
        <div className="flex aspect-[16/10] w-full items-end bg-gradient-to-br from-brand-dark to-brand-light p-5">
          {board === "cases" && deal.price ? (
            <span className="text-2xl font-extrabold text-accent">{deal.price}</span>
          ) : (
            <span className="text-sm font-semibold text-white/70">{post.category || boards[board].label}</span>
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          {post.draft ? (
            <span className="rounded bg-red-100 px-1.5 py-0.5 font-semibold text-red-700">초안</span>
          ) : null}
          {post.category ? (
            <span className="rounded-full bg-brand/10 px-2 py-0.5 font-semibold text-brand">{post.category}</span>
          ) : null}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <h2 className="mt-3 text-lg font-bold leading-snug text-ink group-hover:text-brand">{post.title}</h2>
        {post.description ? (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{post.description}</p>
        ) : null}
      </div>
    </Link>
  );
}
