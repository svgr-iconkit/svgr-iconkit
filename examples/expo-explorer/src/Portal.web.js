import React from "react";
import {
  NativeBaseProvider,
  Flex,
  Spinner,
  Center
} from "native-base";
import { nbConfig, nbTheme } from "./theme";
import LoadingView from "./components/LoadingView";

const Home = React.lazy(() => import('./containers/Home'));

export default function Portal() {
  return (
    <NativeBaseProvider config={nbConfig} theme={nbTheme}>
      <React.Suspense fallback={<LoadingView />}>
        <Home />
      </React.Suspense>
    </NativeBaseProvider>
  );
}
