import React from "react";
import { ClipboardStatic } from "react-native";
import {
  Box,
  SimpleGrid,
  Text,
  Icon,
  Pressable,
  useToast,
  Divider,
} from "native-base";
import styled, { css } from "styled-components/native";
import Clipboard from "expo-clipboard";
import StyledIcon from "./StyledIcon";

const IconContent = styled(Box)`
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
`;
const IconWrapper = styled(Pressable)`
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100px;
  height: 130px;
`;
const IconListWrapper = styled.View`
  position: relative;
  width: 100%;
`;
IconListWrapper.displayName = "IconListWrapper";

const IconLabel = styled(Text)`
  align-items: center;
  justify-content: center;
  padding: 2px;
  width: 100px;
  height: 30px;
  font-size: 9px;
  text-align: center;
  display: flex;
`;

export default function IconList({
  maxCount,
  color = "#ccc",
  size = 24,
  strokeWidth = 1,
  variant = "regular",
  allIconNames = [],
  searching = false,
  onIconPress,
  numColumn = 3,
  iconsetInfo,
}) {
  const toast = useToast();

  if (!iconsetInfo) {
    console.warn("Variant %s not exist in map. map=%o", variant, iconsetInfo);
    return null;
  }
  const {
    Iconset,
    variantNames,
    iconNames,
    defaultVariant,
    map,
  } = iconsetInfo;

  if (!map) {
    console.warn("Variant %s not exist in map. map=%o", variant, map);
    return null;
  }

  return (
    <IconListWrapper color={color} size={size}>
      {allIconNames && allIconNames.length > 0 && (
        <SimpleGrid
          alignItems="center"
          columns={numColumn}
          spacingY={4}
          spacingX={4}
        >
          {allIconNames.slice(0, maxCount).map((iconName) => (
            <IconWrapper
              onPress={() => onIconPress && onIconPress(iconName)}
              key={iconName}
            >
              <IconContent>
                <Iconset
                  variant={variant}
                  name={iconName}
                  strokeWidth={strokeWidth}
                  size={size}
                  color={color}
                />
              </IconContent>
              <IconLabel noOfLines={3} numberOfLines={3}>
                {iconName}
              </IconLabel>
            </IconWrapper>
          ))}
        </SimpleGrid>
      )}
    </IconListWrapper>
  );
}
