"use client";

import { Suspense } from 'react';
import ProjectCard from '../../../components/projects/ProjectCard';

export default function ProjectCategoryPage() {  // نام متفاوت از ProjectCard
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <ProjectCard />
    </Suspense>
  );
}
