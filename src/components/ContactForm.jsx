"use client";

import { useState } from "react";
import { site } from "@/data/site";

// =====================================================================
//  문의 폼
//  - 현재는 백엔드(전송 API)가 없어 '이메일 앱으로 열기(mailto)' 방식으로 동작합니다.
//    → 실제 서버 전송을 원하면 handleSubmit 의 TODO 부분에 fetch 로 교체하세요.
//  - 개인정보 수집·이용 동의 체크박스는 법적 요구사항이라 필수로 두었습니다.
//  - 스팸 방지: 실제 운영 시 reCAPTCHA(구글) 또는 Cloudflare Turnstile 연동 권장.
//    (아래 [스팸방지] 영역 참고)
// =====================================================================
export default function ContactForm({ defaultType = "building" }) {
  const [type, setType] = useState(defaultType); // building | recruit
  const [agree, setAgree] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!agree) {
      alert("개인정보 수집·이용에 동의해주세요.");
      return;
    }
    const f = e.target;
    const kind = type === "recruit" ? "[중개사 합류 문의]" : "[빌딩 문의]";
    const subject = `${kind} ${f.name.value} 님`;
    const body = [
      `구분: ${type === "recruit" ? "중개사 합류" : "빌딩 문의"}`,
      `성함: ${f.name.value}`,
      `연락처: ${f.phone.value}`,
      `이메일: ${f.email.value}`,
      "",
      "문의 내용:",
      f.message.value,
    ].join("\n");

    // TODO(백엔드 연동): 아래 mailto 대신 fetch("/api/contact", {...}) 로 교체 가능
    const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  const inputClass =
    "w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 문의 유형 */}
      <div className="flex gap-2">
        {[
          { id: "building", label: "빌딩 문의" },
          { id: "recruit", label: "중개사 합류" },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setType(t.id)}
            className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
              type === t.id
                ? "border-brand bg-brand text-white"
                : "border-black/15 text-muted hover:border-brand/40"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink">성함 *</label>
          <input name="name" required className={inputClass} placeholder="홍길동" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink">연락처 *</label>
          <input name="phone" required className={inputClass} placeholder="010-0000-0000" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">이메일</label>
        <input name="email" type="email" className={inputClass} placeholder="you@example.com" />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">문의 내용 *</label>
        <textarea
          name="message"
          required
          rows={5}
          className={inputClass}
          placeholder="문의하실 내용을 자유롭게 적어주세요. (빌딩 위치/규모, 매도·매수 희망, 합류 관심 등)"
        />
      </div>

      {/* 개인정보 동의 (필수) */}
      <label className="flex items-start gap-2.5 text-sm text-muted">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-black/30 text-brand focus:ring-brand"
        />
        <span>
          개인정보 수집·이용에 동의합니다. (수집 항목: 성함·연락처·이메일 / 목적: 문의 응대 / 보유기간: 문의 처리 후 파기)
          자세한 내용은{" "}
          <a href="/privacy" className="font-semibold text-brand underline">
            개인정보처리방침
          </a>
          을 확인하세요.
        </span>
      </label>

      {/* [스팸방지] 실제 운영 시 이 자리에 reCAPTCHA / Turnstile 위젯을 넣으세요 */}
      {/* 예: <div className="g-recaptcha" data-sitekey="..."></div> */}

      <button type="submit" className="btn-ghost w-full">
        문의 보내기
      </button>
      <p className="text-center text-xs text-muted">
        전송 버튼을 누르면 메일 앱이 열립니다. 빠른 상담은 아래 전화·카카오톡을 이용하세요.
      </p>
    </form>
  );
}
