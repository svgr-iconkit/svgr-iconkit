import React from "react";
import {
  Box,
  Container,
  IconButton,
  SimpleGrid,
  NativeBaseProvider,
  Text,
  Tabs,
} from "native-base";
import Icon, { iconNames } from "./Icon";
import { Button, Platform, ScrollView, Dimensions } from "react-native";

function IconList ({maxCount}) {

  const size = Dimensions.get("window");

  return (
    <SimpleGrid alignItems="center" columns={Math.floor(size.width / 100)} spacingY={4} spacingX={4}>
      {iconNames.slice(0, maxCount).map((icon) => (
        <Box width={100} height={100} alignItems="center" justifyContent="center" key={icon}>
          <Box width={60} height={60} alignItems="center" justifyContent="center"><Icon name={icon} color="black" size={24} /></Box>
          <Text height={30} fontSize={10} textAlign="center">{icon}</Text>
        </Box>
      ))}
    </SimpleGrid>
    );
}

function Portal() {
  const [maxCount, setMaxCount] = React.useState(120);

  const onShowMore = () => {
    setMaxCount(maxCount + 120);
  };

  return (<>
    <Tabs safeAreaTop>
      <Tabs.Tab accessibilityLabel="test">
          <Text>Test</Text>
      </Tabs.Tab>
    </Tabs>
    <ScrollView>
      <Box  safeAreaBottom>
        <IconList maxCount={maxCount} />
      </Box>
      <Box padding={8}>
        <Button onPress={onShowMore} title="Show more 120 icons"></Button>
      </Box>
    </ScrollView>
    </>
  );
}

export default function () {
  return (
    <NativeBaseProvider>
      <Portal />
    </NativeBaseProvider>
  );
}
