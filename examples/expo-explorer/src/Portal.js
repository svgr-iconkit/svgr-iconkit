import React from "react";
import {
  NativeBaseProvider,
} from "native-base";

const Home = React.lazy(() => import('./containers/Home'));

export function Portal() {
  return (
    <NativeBaseProvider>
      <React.Suspense fallback={<div className="loading" />}>
        <Home />
      </React.Suspense>
    </NativeBaseProvider>
  );
}
