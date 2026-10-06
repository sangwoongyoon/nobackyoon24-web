// =====================================================================
//  게시판 콘텐츠 로더 (매각사례 / 칼럼 / 부동산뉴스)
//  - content/<게시판>/*.md 파일을 읽어 목록·상세 페이지를 만듭니다.
//  - 글 추가 = 마크다운 파일 하나 추가 → git push → 자동 배포
// =====================================================================
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

// 게시판 정의 (탭 이름·URL·설명은 여기서 수정)
export const boards = {
  cases: {
    key: "cases",
    label: "매각사례",
    href: "/cases",
    eyebrow: "Deal Cases",
    title: "빌딩 매각사례 분석",
    description:
      "서울 주요 지역에서 실제 거래된 빌딩 매각 사례를 실거래 데이터로 분석합니다. 매각가·평단가·매수 주체·주변 시세 대비 수준까지 숫자로 정리합니다.",
    schemaType: "Article",
  },
  columns: {
    key: "columns",
    label: "칼럼",
    href: "/columns",
    eyebrow: "Column",
    title: "빌딩 투자 칼럼",
    description:
      "빌딩 매입·매각, 법인 투자, 세금, 시장 흐름까지. 현장에서 검증한 빌딩 투자 인사이트를 정리합니다.",
    schemaType: "Article",
  },
  news: {
    key: "news",
    label: "부동산뉴스",
    href: "/news",
    eyebrow: "Market News",
    title: "부동산 뉴스 & 해설",
    description:
      "상업용 부동산 관련 주요 뉴스와 정책 변화를 빌딩 중개 현장의 시각으로 해설합니다.",
    schemaType: "NewsArticle",
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content");
const isProd = process.env.NODE_ENV === "production";

export function toDateString(v) {
  if (!v) return null;
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v).slice(0, 10);
}

function readPost(board, file) {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, board, file), "utf8");
  const { data, content } = matter(raw);
  const date = toDateString(data.date);
  return {
    ...data,
    board,
    slug,
    date,
    updated: toDateString(data.updated) || date,
    tags: data.tags || [],
    summary: data.summary || [],
    faq: data.faq || [],
    html: marked.parse(content),
    readingMinutes: Math.max(1, Math.round(content.replace(/\s/g, "").length / 500)),
  };
}

// 게시판 글 목록 (최신순). draft: true 인 글은 배포 사이트에서 숨김
export function getPosts(board) {
  const dir = path.join(CONTENT_DIR, board);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => readPost(board, f))
    .filter((p) => !(isProd && p.draft))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(board, slug) {
  return getPosts(board).find((p) => p.slug === decodeURIComponent(slug)) || null;
}

export function formatDate(d) {
  return d ? d.replace(/-/g, ".") : "";
}
