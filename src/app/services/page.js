import Services from "a/components/Services/Services";
import { Suspense } from 'react';

export default function Landing() {
    return (
        <Suspense fallback={<div>Loading...</div>}>

        <Services />
</Suspense >
    )
}