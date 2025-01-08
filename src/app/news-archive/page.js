import Archive from "a/components/Archive/Archive"
import { Suspense } from 'react';

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>

        <Archive />
    </Suspense >
    )
}
