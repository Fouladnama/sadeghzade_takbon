import LandingPage from "../../components/Landing/Landing";
import { Suspense } from 'react';

export default function Landing() {
    return (
        <Suspense fallback={<div>Loading...</div>}>

        <LandingPage />

        </Suspense >
    )
}