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
import Clipboard from "expo-clipboard";
import { Icon as SVGIcon } from "@svgr-iconkit/core";
import { map as AppIconMap } from "@svgr-iconkit/material-design";
import { map as BrandsIconMap } from "@svgr-iconkit/fontawesome5-brands";

import { iconsets } from "../config";
import IconList from "../components/IconList";
import Header from "../components/Header";
import Content from "../components/Content";
import ColorPicker from "../components/ColorPicker";
import SlideMenu from "./SideMenu";

const defaultMaxShownNum = 60;

export default function Home() {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclose();
  const toast = useToast();

  const {
    isOpen: isSettingOpen,
    onOpen: onSettingOpen,
    onClose: onSettingClose,
  } = useDisclose();
  const windowSize = Dimensions.get("window");

  const [isTablet] = useMediaQuery({ minWidth: 768 });

  const [currentIconsetIndex, setIconsetIndex] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [currentVariant, setVariant] = useState("regular");
  const onChangeIconset = useCallback((newIndex) => {
    onDrawerClose();
    setIconsetIndex(newIndex);
    const { defaultVariant = "regular" } = iconsets[newIndex];
    setVariant(defaultVariant);
    setMaxIconsShown(defaultMaxShownNum);
  }, []);
  const [iconSize, setIconSize] = useState(24);
  const [iconColor, setIconColor] = useState("#0693E3");
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);
  const [isUsingStyledComponent, setUsingStyledComponent] = useState(true);

  const [, setUpdateTime] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const iconsetInfo = iconsets[currentIconsetIndex] || {};

  const { iconNames = [] } = iconsetInfo;

  const isSearchMode =
    !!keyword && typeof keyword === "string" && keyword.length > 0;
  const [maxIconsShown, setMaxIconsShown] = useState(defaultMaxShownNum);

  const matchedIconNames = !isSearchMode
    ? iconNames
    : iconNames.filter((name) =>
        name.toLowerCase().includes(keyword.toLowerCase())
      );

  useEffect(() => {
    if (
      !iconsetInfo.resources ||
      typeof iconsetInfo.resources !== "function" ||
      iconsetInfo.__loaded
    ) {
      return;
    }
    async function run() {
      const { Icon, ...restProps } = await iconsetInfo.resources();

      iconsets[currentIconsetIndex] = {
        ...iconsetInfo,
        component: Icon,
        __loaded: true,
        ...restProps,
      };
      setUpdateTime(Date.now());
    }
    run();
  }, [iconsetInfo, currentIconsetIndex]);

  const onIconPress = (icon) => {
    Clipboard.setString(icon);
    toast.show({
      duration: 6000,
      title: `Icon name ${icon} copied in clipboard!`,
    });
  };
  const onPackageNamePress = () => {
    Clipboard.setString(iconsetInfo.packageName);
    toast.show({
      duration: 6000,
      title: `Package name ${iconsetInfo.packageName} copied in clipboard!`,
    });
  };

  const iconsColumns = Math.floor(
    (windowSize.width - 20 - (isTablet ? 300 : 0)) / 120
  );

  const onShowMore = () => setMaxIconsShown(maxIconsShown + 60);

  return (
    <>
      <HStack>
        {isTablet && (
          <Box
            width={300}
            height={windowSize.height}
            backgroundColor="white"
            borderRightColor="#ececec"
            borderRightWidth={1}
          >
            <SlideMenu
              iconsets={iconsets}
              currentIconsetIndex={currentIconsetIndex}
              onChangeIconset={onChangeIconset}
            />
          </Box>
        )}
        <Box flex={1} height={windowSize.height}>
          <Header safeAreaTop>
            <Header.Row>
              {!isTablet && (
                <Header.Item>
                  <IconButton
                    onPress={onDrawerOpen}
                    icon={
                      <SVGIcon content={AppIconMap.regular.menu} size={24} color="black" />
                    }
                  />
                </Header.Item>
              )}
              <Header.Item flex={1}>
                <Input
                  flex={1}
                  size="xs"
                  placeholder="Filter by keywords"
                  value={keyword}
                  onChangeText={setKeyword}
                />
              </Header.Item>
              <Header.Item>
                <IconButton
                  onPress={onSettingOpen}
                  icon={
                    <SVGIcon content={AppIconMap.regular.settings} size={24} color="black" />
                  }
                />
              </Header.Item>
            </Header.Row>
            <Header.Row>
              <Header.Item leftSide>
                <Text bold fontSize="14px">
                  {iconsetInfo.packageName}
                </Text>
              </Header.Item>
              <Header.Item rightSide>
                <Link
                  href={`https://npmjs.com/package/${iconsetInfo.packageName}`}
                >
                  <SVGIcon content={BrandsIconMap.regular.npm} name="npm" size={26} color="red" />{" "}
                </Link>
                <IconButton
                  onPress={onPackageNamePress}
                  icon={
                    <SVGIcon
                      content={AppIconMap.regular['content-copy']}
                      name="content-copy"
                      size={18}
                      color="black"
                    />
                  }
                />
              </Header.Item>
            </Header.Row>
          </Header>
          <Content padder>
            {iconsetInfo && (
              <>
                <IconList
                  maxCount={maxIconsShown}
                  component={iconsetInfo.component}
                  variant={currentVariant}
                  size={iconSize}
                  color={iconColor}
                  allIconNames={matchedIconNames}
                  allVariantNames={iconsetInfo.variantNames}
                  onIconPress={onIconPress}
                  numColumn={iconsColumns}
                />

                {Array.isArray(matchedIconNames) &&
                  maxIconsShown < matchedIconNames.length && (
                    <Box safeAreaBottom padding={8}>
                      <Button onPress={onShowMore}>Show more icons</Button>
                    </Box>
                  )}
              </>
            )}
          </Content>
        </Box>
        <Modal isOpen={isSettingOpen} onClose={onSettingClose}>
          <VStack
            p={4}
            space={4}
            mx={10}
            width="80%"
            backgroundColor="#fff"
            borderRadius={5}
          >
            <FormControl>
              <FormControl.Label>{`Variants`}</FormControl.Label>
              <Select
                safeAreaBottom
                selectedValue={currentVariant}
                onValueChange={setVariant}
              >
                {Array.isArray(iconsetInfo.variantNames) &&
                  iconsetInfo.variantNames.map((name) => (
                    <Select.Item key={name} label={name} value={name} />
                  ))}
              </Select>
            </FormControl>
            <Divider />
            <FormControl>
              <FormControl.Label>{`Size: ${iconSize}px`}</FormControl.Label>
              <Slider
                minValue={12}
                maxValue={48}
                defaultValue={iconSize}
                onChangeEnd={setIconSize}
              >
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
            </FormControl>
            <Divider />
            <FormControl>
              <FormControl.Label>{`Color:`}</FormControl.Label>

              <ColorPicker value={iconColor} onValueChange={setIconColor} />
            </FormControl>
          </VStack>
        </Modal>
      </HStack>

      {!isTablet && (
        <Slide in={isDrawerOpen} placement="left"  height="100%" bottom={0} bg="white">
          <Box width="80%" minWidth={300} bottom={0} height="100%" bg="white"
            borderRightColor="#ececec"
            borderRightWidth={1}
             rounded="md">
            <SlideMenu
              iconsets={iconsets}
              currentIconsetIndex={currentIconsetIndex}
              onChangeIconset={onChangeIconset}
            />
          </Box>
        </Slide>
      )}
    </>
  );
}
