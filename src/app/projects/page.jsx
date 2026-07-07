import PageHero from "@/components/PageHero";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata = { title: "프로젝트" };

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="시기별 중개 실적"
        description="강남 상업용 빌딩을 중심으로 한 실제 거래 사례입니다. 데이터로 증명합니다."
      />

      <section className="section">
        <div className="container-x">
          {projects.length === 0 ? (
            <p className="text-center text-muted">등록된 프로젝트가 없습니다.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}

          <p className="mt-10 text-center text-xs text-muted">
            ※ 표기된 거래 정보는 고객 동의 범위 내에서 공개되며, 상세 정보는 문의 시 안내드립니다.
          </p>
        </div>
      </section>
    </>
  );
}
