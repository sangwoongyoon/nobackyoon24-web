"use client";

import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";

// 지역/거래유형 필터 + 실적 목록 (최신순)
export default function ProjectList({ projects }) {
  const [gu, setGu] = useState("전체");
  const [type, setType] = useState("전체");

  // 지역(구) 목록 추출
  const guList = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => {
      const parts = p.region.split(" ");
      set.add(parts[parts.length - 1]); // 마지막 토큰 = 구/시
    });
    return ["전체", ...Array.from(set).sort()];
  }, [projects]);

  const filtered = projects.filter((p) => {
    const g = p.region.split(" ").pop();
    const okGu = gu === "전체" || g === gu;
    const okType =
      type === "전체" ||
      (type === "매수" && p.type.includes("매수")) ||
      (type === "매도" && p.type.includes("매도"));
    return okGu && okType;
  });

  const selCls =
    "rounded-lg border border-black/15 bg-white px-3 py-2 text-sm font-medium text-ink outline-none focus:border-brand";

  return (
    <div>
      {/* 필터 바 */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <select value={gu} onChange={(e) => setGu(e.target.value)} className={selCls}>
          {guList.map((g) => (
            <option key={g} value={g}>
              {g === "전체" ? "지역 전체" : g}
            </option>
          ))}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)} className={selCls}>
          <option value="전체">거래유형 전체</option>
          <option value="매수">매수</option>
          <option value="매도">매도</option>
        </select>
        <span className="ml-auto text-sm text-muted">
          총 <strong className="text-brand">{filtered.length}</strong>건
        </span>
      </div>

      {/* 목록 */}
      <div className="flex flex-col gap-6">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted">해당 조건의 실적이 없습니다.</p>
      )}
    </div>
  );
}
