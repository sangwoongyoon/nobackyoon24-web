import PageHero from "@/components/PageHero";
import ProjectList from "@/components/ProjectList";
import { projects } from "@/data/projects";

export const metadata = { title: "프로젝트" };

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="중개 실적"
        description={`강남 상업용 빌딩을 중심으로 한 실제 거래 사례 ${projects.length}건입니다. 데이터로 증명합니다.`}
      />

      <section className="section">
        <div className="container-x">
          <ProjectList projects={projects} />
          <p className="mt-10 text-center text-xs text-muted">
            ※ 표기된 거래 정보는 고객 동의 범위 내에서 공개되며, 상세 정보는 문의 시 안내드립니다.
          </p>
        </div>
      </section>
    </>
  );
}
