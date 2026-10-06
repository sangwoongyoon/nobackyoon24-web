// 구글 검색/AI 개요가 페이지 내용을 정확히 이해하도록 돕는 구조화 데이터(JSON-LD)
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
