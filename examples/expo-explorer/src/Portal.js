import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import Home from "./containers/Home";
import { nbConfig, nbTheme } from "./theme";
import LoadingView from "./components/LoadingView";

export default function Portal() {
  return (
    <NativeBaseProvider config={nbConfig} theme={nbTheme}>
      <React.Suspense fallback={<LoadingView />}>
        <Home />
      </React.Suspense>
    </NativeBaseProvider>
  );
}
