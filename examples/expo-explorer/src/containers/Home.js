import React, { useCallback, useState, useEffect } from "react";
import { Platform, ScrollView, Dimensions } from "react-native";
import {
  Button,
  Box,
  Container,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
  Tabs,
  Input,
  Pressable,
  Select,
  Slide,
  Divider,
  useDisclose,
  Modal,
  VStack,
  Menu,
  HStack,
  FormControl,
  Slider,
  Heading,
  Spinner,
  Link,
  useToast,
  useMediaQuery,
  Flex,
} from "native-base";
import * as Clipboard from "expo-clipboard";
import MenuIconContent from "@svgr-iconkit/material-design/icons/regular/menu";
import ExpandMoreIconContent from "@svgr-iconkit/material-design/icons/regular/expand-more";
import SettingsIconContent from "@svgr-iconkit/material-design/icons/regular/settings";
import ContentCopyIconContent from "@svgr-iconkit/material-design/icons/regular/content-copy";
import NpmIconContent from "@svgr-iconkit/fontawesome5-brands/icons/regular/npm";

import { iconsets } from "../config";
import IconList from "../components/IconList";
import Header from "../components/Header";
import Content from "../components/Content";
import ColorPicker from "../components/ColorPicker";
import StyledIcon from "../components/StyledIcon";
import SlideMenu from "./SideMenu";
import LoadingView from "../components/LoadingView";

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
  const isLandscape = windowSize.width > windowSize.height;

  const [currentIconsetIndex, setIconsetIndex] = useState(-1);
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

  const hasVariants = Array.isArray(iconsetInfo.variantNames);
  const shouldVariantShowInHeader = isLandscape && isTablet;
  const hasSelectIconset = !!iconsetInfo && currentIconsetIndex >= 0;
  const hasMatchedIcons = matchedIconNames && matchedIconNames.length > 0;

  return (
    <>
      <HStack>
        {isTablet && (
          <Box
            width={300}
            height={windowSize.height}
            backgroundColor="white"
            borderRightColor="#f3f3f3"
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
                    testID={`drawer-btn:${iconsetInfo.packageName}`}
                    onPress={onDrawerOpen}
                    icon={
                      <StyledIcon
                        content={MenuIconContent}
                        size={24}
                        color="black"
                      />
                    }
                  />
                </Header.Item>
              )}
              <Header.Item flex={1}>
                <Input
                  isDisabled={!hasSelectIconset}
                  flex={1}
                  size="xs"
                  testID={`keyword-filter-tf:${iconsetInfo.packageName}`}
                  placeholder="Filter by keywords"
                  value={keyword}
                  onChangeText={setKeyword}
                  bg="white"
                />
              </Header.Item>
              <Header.Item>
                <IconButton
                  onPress={onSettingOpen}
                  testID={`setting-dd:${iconsetInfo.packageName}`}
                  icon={
                    <StyledIcon
                      content={SettingsIconContent}
                      size={24}
                      color="black"
                    />
                  }
                />
              </Header.Item>
            </Header.Row>
            <Header.Row>
              <Header.Item leftSide>
                {hasSelectIconset && (
                  <Text bold fontSize="14px">
                    {iconsetInfo.packageName}
                  </Text>
                )}
                {hasSelectIconset && hasVariants && shouldVariantShowInHeader && (
                  <>
                    <Text color="#666" fontSize="14px" mx={1}>
                      @
                    </Text>
                    <Menu
                      closeOnSelect
                      trigger={(triggerProps) => {
                        return (
                          <Pressable
                            flexDirection="row"
                            alignItems="center"
                            testID={`variants-dd:${iconsetInfo.packageName}`}
                            {...triggerProps}
                          >
                            <Text fontSize="14px" bold color="secondary.500">
                              {currentVariant}
                            </Text>

                            <Icon
                              as={StyledIcon}
                              content={ExpandMoreIconContent}
                              size={18}
                              color="secondary.400"
                            />
                          </Pressable>
                        );
                      }}
                    >
                      {iconsetInfo.variantNames.map((name) => (
                        <Menu.Item
                          minWidth="200px"
                          testID={`change-variant-btn:${iconsetInfo.packageName}-${name}`}
                          isDisabled={name === currentVariant}
                          onPress={() => setVariant(name)}
                        >
                          {name}
                        </Menu.Item>
                      ))}
                    </Menu>
                  </>
                )}
              </Header.Item>
              <Header.Item rightSide>
                {hasSelectIconset && (
                  <Link
                    testID={`npm-btn:${iconsetInfo.packageName}`}
                    href={`https://npmjs.com/package/${iconsetInfo.packageName}`}
                    isExternal
                  >
                    <StyledIcon
                      content={NpmIconContent}
                      name="npm"
                      size={24}
                      color="red"
                    />
                  </Link>
                )}{" "}
                {hasSelectIconset && (
                  <IconButton
                    onPress={onPackageNamePress}
                    testID={`copy-package-btn:${iconsetInfo.packageName}`}
                    icon={
                      <StyledIcon
                        content={ContentCopyIconContent}
                        name="content-copy"
                        fill="currentcolor"
                        size={24}
                        color="black"
                      />
                    }
                  />
                )}
              </Header.Item>
            </Header.Row>
          </Header>
          <Content padder>
            {currentIconsetIndex >= 0 && !!iconsetInfo && (
              <>
                {iconsetInfo.__loaded && !hasMatchedIcons && (
                  <Box
                    display="flex"
                    minHeight="40px"
                    flexBasis={"auto"}
                    mx="4"
                    flex={1}
                  >
                    <Text bold fontSize="sm">
                      No matched icons
                    </Text>
                  </Box>
                )}
                {!iconsetInfo.__loaded && !hasMatchedIcons && (
                  <Flex mx="4">
                    <Text fontSize="sm">Loading</Text>
                  </Flex>
                )}
                {hasMatchedIcons && (
                  <Box
                    display="flex"
                    minHeight="40px"
                    flexBasis={"auto"}
                    mx="4"
                    mb="4"
                    flex={1}
                  >
                    <Text fontSize="sm">
                      Found {matchedIconNames.length} matched icons
                    </Text>
                    <Divider my={4} />
                  </Box>
                )}
                <IconList
                  maxCount={maxIconsShown}
                  variant={currentVariant}
                  searching={isSearchMode}
                  size={iconSize}
                  color={iconColor}
                  allIconNames={matchedIconNames}
                  iconsetInfo={iconsetInfo}
                  onIconPress={onIconPress}
                  numColumn={iconsColumns}
                />

                {Array.isArray(matchedIconNames) &&
                  maxIconsShown < matchedIconNames.length && (
                    <Box safeAreaBottom padding={8}>
                      <Button
                        onPress={onShowMore}
                        testID={`showmore-btn:${iconsetInfo.packageName}`}
                      >
                        Show more icons
                      </Button>
                    </Box>
                  )}
              </>
            )}
          </Content>
        </Box>
        <Modal isOpen={isSettingOpen} onClose={onSettingClose}>
          <Modal.Content maxWidth="460px">
            <Modal.Header>Setting</Modal.Header>
            <Modal.CloseButton />
            <Modal.Body>
              {hasVariants && !shouldVariantShowInHeader && (
                <>
                  <FormControl>
                    <FormControl.Label>{`Variants`}</FormControl.Label>
                    <Select
                      testID={`change-variants-dd:${iconsetInfo.packageName}`}
                      selectedValue={currentVariant}
                      onValueChange={setVariant}
                    >
                      {Array.isArray(iconsetInfo.variantNames) &&
                        iconsetInfo.variantNames.map((name) => (
                          <Select.Item key={name} label={name} value={name} />
                        ))}
                    </Select>
                  </FormControl>
                  <Divider my={2} />
                </>
              )}
              <FormControl>
                <FormControl.Label>{`Size: ${iconSize}px`}</FormControl.Label>
                <Slider
                  minValue={12}
                  maxValue={80}
                  defaultValue={iconSize}
                  onChangeEnd={setIconSize}
                >
                  <Slider.Track>
                    <Slider.FilledTrack />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider>
              </FormControl>
              <Divider my={2} />
              <FormControl>
                <FormControl.Label>{`Color:`}</FormControl.Label>

                <ColorPicker value={iconColor} onValueChange={setIconColor} />
              </FormControl>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </HStack>

      {!isTablet && (
        <Slide
          in={isDrawerOpen}
          placement="left"
          height="100%"
          bottom={0}
          bg="white"
        >
          <Box
            width="80%"
            minWidth={300}
            bottom={0}
            height="100%"
            bg="white"
            borderRightColor="#ececec"
            borderRightWidth={1}
            rounded="md"
          >
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
