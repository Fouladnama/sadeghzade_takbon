import Project from "a/components/Projects/Projects"
import { Suspense } from 'react';

export default function Projects() {
    return (
        <Suspense fallback={<div>Loading...</div>}>

        <Project />
    </Suspense >
    )
}