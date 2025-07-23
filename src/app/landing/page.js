import Landing from '../../components/Landing/Landing';
import { Suspense } from 'react';

export default function LandingPage() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <Landing />
    </Suspense>
  );
}