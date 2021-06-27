import React from "react";
import { Dimensions, ClipboardStatic } from "react-native";
import { Box, SimpleGrid, Text, Icon, Pressable, useToast } from "native-base";
import styled, { css } from "styled-components/native";
import Clipboard from "expo-clipboard";

const IconWrapper = styled(Pressable)`
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100px;
  height: 100px;
`;
const IconContent = styled(Box)`
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 70px;
`;
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
  color = "black",
  size = 24,
  variant = "regular",
  allIconNames = [],
  component: Iconset,
  children,
  onIconPress,
}) {
  const windowSize = Dimensions.get("window");
  
  const toast = useToast();
  
  if (!Iconset) {
    return null;
  }

  return (
    <>
      <SimpleGrid
        alignItems="center"
        columns={Math.floor((windowSize.width - 20) / 100)}
        spacingY={4}
        spacingX={4}
      >
        {allIconNames &&
          allIconNames.slice(0, maxCount).map((icon) => (
            <IconWrapper onPress={() => onIconPress && onIconPress(icon)} key={icon}>
              <IconContent>
                <Icon as={Iconset} variant={variant} name={icon} color={color} size={size} />
              </IconContent>
              <IconLabel noOfLines={3} numberOfLines={3}>
                {icon}
              </IconLabel>
            </IconWrapper>
          ))}
      </SimpleGrid>
      {children}
    </>
  );
}
