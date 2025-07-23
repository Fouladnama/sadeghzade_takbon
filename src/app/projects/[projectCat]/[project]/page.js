"use client";

import { Suspense } from "react";
import ProjectDetail from "../../.././../components/projects/ProjectDetail";

export default function ProjectDetailPage() {
  return (
    <Suspense fallback={<div>Loading project details...</div>}>
      <ProjectDetail />
    </Suspense>
  );
}
