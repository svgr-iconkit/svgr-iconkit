import React from "react";
import {
  NativeBaseProvider,
  Box
} from "native-base";

const Home = React.lazy(() => import('./containers/Home'));

export function Portal() {
  return (
    <NativeBaseProvider>
      <React.Suspense fallback={<Box className="loading" />}>
        <Home />
      </React.Suspense>
    </NativeBaseProvider>
  );
}
