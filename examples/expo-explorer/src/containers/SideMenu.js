import React, { useCallback, useState, useEffect } from "react";
import { Platform, ScrollView, Dimensions } from "react-native";
import {
  Button,
  Box,
  Center,
  Container,
  IconButton,
  SimpleGrid,
  Image,
  Text,
  Tabs,
  Input,
  Icon,
  Select,
  Slide,
  Divider,
  useDisclose,
  Modal,
  VStack,
  HStack,
  FormControl,
  Slider,
  Heading,
  Link,
  useToast,
  useMediaQuery,
} from "native-base";
import AppIcon from "@svgr-iconkit/material-community/native";
import BrandsIcon from "@svgr-iconkit/fontawesome5-brands/native";

export default function SideMenu({
  iconsets = [],
  currentIconsetIndex = 0,
  onChangeIconset,
}) {
  return (
    <ScrollView>
      <Box zIndex={2} safeAreaTop bg="#f3f3f3" pb="3">
        <Center>
          <Link
            _web={{
              testID: "official-link-btn",
            }}
            href="https://svgr-iconkit.dev"
          >
            <Image
              width={64}
              height={64}
              alt="svgr-iconkit"
              source={require("../assets/images/logo-transparent.png")}
            />
          </Link>
        </Center>
        <Heading textAlign="center" color="#333" mx="4" size="md">
          Icon Explorer for Expo
        </Heading>
      </Box>
      <Box safeAreaBottom>
        <Heading margin="4" color="#777" size="sm">
          Iconsets
        </Heading>
        <Box p={1}>
          {iconsets.map((item, index) => (
            <Button
              key={item.packageName}
              accessibilityLabel={item.name}
              testID={ `sidemenu-btn:${item.packageName}`}
              colorScheme={
                currentIconsetIndex === index ? "secondary" : undefined
              }
              variant="ghost"
              textAlign="left"
              justifyContent="flex-start"
              onPress={() => {
                onChangeIconset(index);
              }}
              title={item.name}
            >
              {item.name}
            </Button>
          ))}
        </Box>
      </Box>
    </ScrollView>
  );
}
