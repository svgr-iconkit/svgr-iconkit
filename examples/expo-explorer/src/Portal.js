import React from "react";
import {
  NativeBaseProvider,
  Box
} from "native-base";
import Home from './containers/Home';

export function Portal() {
  return (
    <NativeBaseProvider>
      <Home />
    </NativeBaseProvider>
  );
}
