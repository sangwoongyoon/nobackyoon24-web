import BoardPost, { postMetadata } from "@/components/board/BoardPost";
import { getPosts } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts("cases").map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  return postMetadata("cases", params.slug);
}

export default function Page({ params }) {
  return <BoardPost board="cases" slug={params.slug} />;
}
