"use client";

import { useState } from "react";
import { site } from "@/data/site";

// =====================================================================
//  문의 폼 (자동 전송 방식 · Web3Forms)
//  - 고객이 작성 후 "문의 보내기"를 누르면 서버를 거쳐 상무님 이메일
//    (site.contact.email)로 바로 전송됩니다.
//  - 무료 서비스 Web3Forms 사용. site.contact.formKey 에 액세스 키만
//    넣으면 작동합니다. (web3forms.com 에서 이메일로 무료 발급)
//  - 개인정보 동의 체크박스는 법적 요구사항이라 필수입니다.
//  - botcheck(숨은 필드)로 기본 스팸을 걸러줍니다.
// =====================================================================
export default function ContactForm({ defaultType = "building" }) {
  const [type, setType] = useState(defaultType); // building | recruit
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!agree) {
      alert("개인정보 수집·이용에 동의해주세요.");
      return;
    }
    setStatus("sending");

    const f = e.target;
    const kind = type === "recruit" ? "중개사 합류 문의" : "빌딩 문의";
    const payload = {
      access_key: site.contact.formKey,
      subject: `[${kind}] ${f.name.value} 님`,
      from_name: `노빠꾸 윤상웅 홈페이지`,
      문의구분: kind,
      성함: f.name.value,
      연락처: f.phone.value,
      이메일: f.email.value,
      문의내용: f.message.value,
      botcheck: f.botcheck.checked, // 스팸봇 감지용 숨은 필드
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        f.reset();
        setAgree(false);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

  // 전송 성공 화면
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-2xl">
          ✅
        </div>
        <h3 className="mt-4 text-lg font-bold text-ink">문의가 접수되었습니다</h3>
        <p className="mt-2 text-sm text-muted">
          빠른 시일 내 연락드리겠습니다. 급하시면 전화(010-9259-7016)로 연락 주세요.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-ghost mt-6"
        >
          새 문의 작성
        </button>
      </div>
    );
  }

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

      {/* 스팸봇 감지용 숨은 필드 (사람에게는 보이지 않음) */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

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

      {status === "error" && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          전송에 실패했습니다. 잠시 후 다시 시도하시거나 전화(010-9259-7016)로 연락 주세요.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-ghost w-full disabled:opacity-60"
      >
        {status === "sending" ? "전송 중…" : "문의 보내기"}
      </button>
      <p className="text-center text-xs text-muted">
        빠른 상담은 전화·카카오톡을 이용하세요.
      </p>
    </form>
  );
}
