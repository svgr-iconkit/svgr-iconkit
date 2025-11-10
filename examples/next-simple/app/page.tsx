'use client'

import { lazy, Suspense } from "react";

const IconView = lazy(() => import("./icon-view"));


export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
       <IconView/>
      </Suspense>
    </main>
  );
}
