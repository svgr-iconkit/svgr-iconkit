import React, { useCallback, useState, useEffect } from "react";
import { Platform, ScrollView, Dimensions } from "react-native";
import {
  Button,
  Box,
  Container,
  IconButton,
  SimpleGrid,
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
import AppIcon from "@svgr-iconkit/material-community";
import BrandsIcon from "@svgr-iconkit/fontawesome5-brands";

export default function SideMenu({
  iconsets = [],
  currentIconsetIndex = 0,
  onChangeIconset,
}) {
  return (
    <>
      <Box zIndex={2} safeAreaTop bg="primary.500" p={3} paddingBottom={5}>
        <Heading alignItems="flex-start" justifyContent="center" color="#fff">
          svgr-iconkit{" "}
          <Link
            _web={{
              "data-elm-type": "official-link-btn",
              "data-elm-id": `official-link-btn`,
            }}
            href="https://svgr-iconkit.dev"
          >
            <Icon as={AppIcon} name="link" size={6} color="#ececec" />{" "}
          </Link>
        </Heading>
        <Heading color="#fff" size="md">
          Explorer for Expo
        </Heading>
      </Box>
      <Box as={ScrollView} safeAreaBottom>
        <Heading margin={5} size="sm">
          Iconsets
        </Heading>
        <Box p={1}>
          {iconsets.map((item, index) => (
            <>
              <Button
                key={item.packageName}
                accessibilityLabel={item.name}
                _web={{
                  "data-elm-type": "sidemenu-btn",
                  "data-elm-id": `sidemenu-btn:${item.packageName}`,
                }}
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
            </>
          ))}
        </Box>
      </Box>
    </>
  );
}
