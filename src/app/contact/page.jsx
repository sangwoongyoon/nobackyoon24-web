import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata = { title: "문의" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="문의하기"
        description="빌딩 매도·매수 상담부터 중개사 합류까지, 편하게 남겨주세요."
      />

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-5">
          {/* 직접 연락 수단 */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-ink">바로 연락하기</h2>
            <p className="mt-2 text-sm text-muted">
              빠른 상담이 필요하시면 전화 또는 카카오톡으로 연락 주세요.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href={site.contact.phoneHref}
                className="flex items-center gap-3 rounded-xl border border-black/10 bg-white p-4 shadow-sm transition hover:border-brand/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                  📞
                </span>
                <span>
                  <span className="block text-xs text-muted">전화 상담</span>
                  <span className="block font-semibold text-ink">{site.contact.phone}</span>
                </span>
              </a>

              <a
                href={site.contact.kakaoOpenChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-black/10 bg-white p-4 shadow-sm transition hover:border-brand/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent-dark">
                  💬
                </span>
                <span>
                  <span className="block text-xs text-muted">카카오톡 상담</span>
                  <span className="block font-semibold text-ink">오픈채팅 바로가기</span>
                </span>
              </a>

              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-3 rounded-xl border border-black/10 bg-white p-4 shadow-sm transition hover:border-brand/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                  ✉️
                </span>
                <span>
                  <span className="block text-xs text-muted">이메일</span>
                  <span className="block font-semibold text-ink">{site.contact.email}</span>
                </span>
              </a>
            </div>
          </div>

          {/* 문의 폼 */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
              <ContactForm defaultType="building" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
