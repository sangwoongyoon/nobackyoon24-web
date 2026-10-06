import { site } from "@/data/site";
import { boards, getPosts } from "@/lib/posts";

// /sitemap.xml 자동 생성 — 글을 올리면 배포 시 자동 반영
export default function sitemap() {
  const base = `https://www.${site.domain}`;
  const now = new Date().toISOString().slice(0, 10);
  const pages = ["", "/about", "/projects", "/contact", "/careers"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
  }));
  const boardPages = Object.values(boards).flatMap((b) => {
    const posts = getPosts(b.key);
    return [
      { url: `${base}${b.href}`, lastModified: posts[0]?.updated || now },
      ...posts.map((p) => ({ url: `${base}${b.href}/${p.slug}`, lastModified: p.updated })),
    ];
  });
  return [...pages, ...boardPages];
}
