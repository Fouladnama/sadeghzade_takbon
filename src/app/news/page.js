import News from "a/components/News/News";
import { Suspense } from 'react';

export default function news() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
        <News />
      </Suspense >
    )
}