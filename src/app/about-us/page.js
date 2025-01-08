import AboutUs from "a/components/AboutUs/AboutUs";
import { Suspense } from 'react';

export default function aboutus() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
      <AboutUs />
  </Suspense>
      
    )
}