import BoardPost, { postMetadata } from "@/components/board/BoardPost";
import { getPosts } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts("columns").map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  return postMetadata("columns", params.slug);
}

export default function Page({ params }) {
  return <BoardPost board="columns" slug={params.slug} />;
}
