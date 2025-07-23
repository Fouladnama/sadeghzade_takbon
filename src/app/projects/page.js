"use client";

import { Suspense } from 'react';
import ProjectList from '../../components/projects/ProjectList';

export default function ProjectCategoryPage() {
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <ProjectList />
    </Suspense>
  );
}
