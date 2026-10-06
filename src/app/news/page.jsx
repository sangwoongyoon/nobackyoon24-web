import BoardIndex from "@/components/board/BoardIndex";
import { boards } from "@/lib/posts";

const b = boards.news;
export const metadata = {
  title: b.title,
  description: b.description,
  alternates: { canonical: b.href },
};

export default function Page() {
  return <BoardIndex board="news" />;
}
