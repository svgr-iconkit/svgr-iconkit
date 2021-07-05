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
  width: 100px;
  height: 70px;
`;
const IconWrapper = styled(Pressable)`
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100px;
  height: 100px;
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
`;

export default function IconList({
  maxCount,
  allVariantNames = [],
  map = {},
  color = "#ccc",
  size = 24,
  variant = "regular",
  allIconNames = [],
  component: Iconset,
  searching = false,
  onIconPress,
  numColumn = 3,
}) {
  const toast = useToast();

  if (!Iconset) {
    return null;
  }

  if (!map[variant]) {
    console.warn('Variant %s not exist in map. map=%o', variant, map);
    
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
                  <StyledIcon
                    content={map[variant][iconName]}
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
