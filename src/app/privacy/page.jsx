import PageHero from "@/components/PageHero";
import { site } from "@/data/site";

export const metadata = { title: "개인정보처리방침" };

// =====================================================================
//  개인정보처리방침 (표준 템플릿)
//  ※ 아래는 일반적인 양식입니다. 실제 시행 전 담당자/보유기간 등 [TODO] 를
//     실제 운영 방식에 맞게 채우고, 가능하면 법률 검토를 받으세요.
// =====================================================================
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="개인정보처리방침" />

      <section className="section">
        <article className="container-x max-w-3xl space-y-8 text-sm leading-relaxed text-ink/90">
          <p>
            {site.legal.officeName}(이하 &lsquo;회사&rsquo;)는 이용자의 개인정보를 중요하게 생각하며,
            「개인정보 보호법」 등 관련 법령을 준수합니다. 본 방침은 회사가 제공하는 웹사이트(
            {site.domain})에서의 개인정보 처리에 관한 사항을 안내합니다.
          </p>

          <div>
            <h2 className="text-lg font-bold text-brand">1. 수집하는 개인정보 항목</h2>
            <p className="mt-2">
              회사는 문의 응대를 위해 다음 정보를 수집합니다. 필수: 성함, 연락처 / 선택: 이메일,
              문의 내용에 포함된 정보.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand">2. 개인정보의 수집 및 이용 목적</h2>
            <p className="mt-2">
              문의·상담 응대, 중개 서비스 및 채용(입사지원) 관련 연락, 문의 이력 관리를 목적으로만
              이용하며, 목적 외로 이용하지 않습니다.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand">3. 보유 및 이용 기간</h2>
            <p className="mt-2">
              수집된 개인정보는 문의 처리 완료 후 지체 없이 파기합니다. 다만 관계 법령에 따라 보존이
              필요한 경우 해당 기간 동안 보관합니다. [TODO: 실제 보유기간 정책이 있으면 명시]
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand">4. 개인정보의 제3자 제공</h2>
            <p className="mt-2">
              회사는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 다만 법령에 근거하거나
              수사기관의 적법한 요청이 있는 경우는 예외로 합니다.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand">5. 개인정보의 파기</h2>
            <p className="mt-2">
              보유 기간이 경과하거나 처리 목적이 달성된 개인정보는 재생이 불가능한 방법으로 지체 없이
              파기합니다.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand">6. 이용자의 권리</h2>
            <p className="mt-2">
              이용자는 언제든지 자신의 개인정보에 대한 열람·정정·삭제·처리정지를 요청할 수 있으며,
              회사는 관련 법령에 따라 조치합니다.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand">7. 개인정보 보호책임자</h2>
            <p className="mt-2">
              성명: {site.legal.ceo}
              <br />
              연락처: {site.legal.phone}
              <br />
              이메일: {site.contact.email}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand">8. 고지의 의무</h2>
            <p className="mt-2">
              본 개인정보처리방침의 내용 추가·삭제 및 수정이 있을 시에는 시행 전 웹사이트를 통해
              공지합니다.
            </p>
            <p className="mt-4 text-muted">시행일: [TODO: YYYY-MM-DD]</p>
          </div>
        </article>
      </section>
    </>
  );
}
