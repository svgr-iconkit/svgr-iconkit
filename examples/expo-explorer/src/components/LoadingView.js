import React from "react";

import { Flex, Spinner, Center } from "native-base";

export default () => (
  <Flex>
    <Center>
      <Spinner animating size="lg" />
    </Center>
  </Flex>
);
