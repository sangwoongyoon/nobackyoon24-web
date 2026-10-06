import { site } from "@/data/site";

// /robots.txt — 구글 등 검색엔진 크롤링 허용 + 사이트맵 위치 안내
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `https://www.${site.domain}/sitemap.xml`,
  };
}
