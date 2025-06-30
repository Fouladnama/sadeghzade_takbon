import Collaborate from "../..//components/Collaborate/Collaborate";
import { Suspense } from 'react';

export default function Collaboration() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
                    <Collaborate />

        </Suspense>
    )
}