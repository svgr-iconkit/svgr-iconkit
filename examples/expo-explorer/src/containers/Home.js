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
} from "native-base";
import Clipboard from "expo-clipboard";
import AppIcon from "@svgr-iconkit/material-community";
import BrandsIcon from "@svgr-iconkit/fontawesome5-brands";

import { iconsets } from "../config";
import IconList from "../components/IconList";
import Header from "../components/Header";
import Content from "../components/Content";
import HSVColorPicker from "../components/HSVColorPicker";

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
      title: `Icon name ${icon} copied in clipboard!`
    })
  };
  const onPackageNamePress = () => {
    Clipboard.setString(iconsetInfo.packageName);
    toast.show({
      duration: 6000,
      title: `Package name ${iconsetInfo.packageName} copied in clipboard!`
    })
  };

  const onShowMore = () => setMaxIconsShown(maxIconsShown + 60);

  return (
    <>
      <Header safeAreaTop>
        <Header.Row>
          <Header.Item>
            <IconButton
              onPress={onDrawerOpen}
              icon={<Icon as={AppIcon} name="menu" size={24} color="black" />}
            />
          </Header.Item>
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
              icon={<Icon as={AppIcon} name="cog" size={24} color="black" />}
            />
          </Header.Item>
        </Header.Row>
        <Header.Row>
          <Header.Item
            leftSide
          >
            <Text bold fontSize="14px">{iconsetInfo.packageName}</Text>
          </Header.Item>
          <Header.Item rightSide>
            <Link href={`https://npmjs.com/package/${iconsetInfo.packageName}`}>
              <Icon as={BrandsIcon} name="npm" size={26} color="red" />{" "}
            </Link>
            <IconButton onPress={onPackageNamePress} icon={<Icon as={AppIcon} name="content-copy" size={18} color="black" />} />
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
      <Slide in={isDrawerOpen} placement="left">
        <Box minWidth="80%" height="100%" bg="white" rounded="md">
          <Box safeAreaTop backgroundColor="#222" p={2} paddingBottom={5}>
            <Heading
              alignItems="flex-start"
              justifyContent="center"
              color="#fff"
            >
              svgr-iconkit{" "}
              <Link href="https://svgr-iconkit.dev">
                <Icon as={AppIcon} name="link" size={20} color="#ccc" />{" "}
              </Link>
            </Heading>
            <Heading color="#fff" size="md">
              explorer
            </Heading>
          </Box>
          <Box as={ScrollView} safeAreaBottom>
            <Heading margin={4} size="sm">
              Iconsets
            </Heading>
            {iconsets.map((item, index) => (
              <>
                <Button
                  key={item.packageName}
                  accessibilityLabel={item.name}
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
      </Slide>
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
              <Select.Item disabled />
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
            <FormControl.Label>{`Color: ${iconColor}`}</FormControl.Label>

            <HSVColorPicker value={iconColor} onValueChange={setIconColor} />
          </FormControl>
        </VStack>
      </Modal>
    </>
  );
}
