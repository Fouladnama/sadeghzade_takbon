import Contact from "../../components/Contact/Contact";
import { Suspense } from 'react';

export default function contact() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
        <Contact />

   </Suspense>
    )
}