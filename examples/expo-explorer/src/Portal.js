import React from "react";
import {
  NativeBaseProvider,
} from "native-base";
import Home from "./containers/Home";

export function Portal() {
  return (
    <NativeBaseProvider>
      <Home />
    </NativeBaseProvider>
  );
}
