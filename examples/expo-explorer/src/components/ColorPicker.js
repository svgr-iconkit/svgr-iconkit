import React from "react";
import { View, StyleSheet } from "react-native";
import { HStack, Input, Pressable } from "native-base";

const defaultColors = ["#FF6900", "#FCB900", "#7BDCB5", "#00D084", "#8ED1FC", "#0693E3", "#ABB8C3", "#EB144C", "#F78DA7", "#9900EF"];
export default function ColorPicker({
  value = "#000",
  colors = defaultColors,
  onValueChange,
}) {
  return (<>
    <HStack flexWrap="wrap" py={2} alignItems="center">
      {colors.map((color) => (
        <Pressable
          borderColor={value === color ? "#333" : "transparent"}
          borderWidth={2}
          borderRadius={5}
          m={1}
          key={color}
          backgroundColor={color}
          width={38}
          height={38}
          onPress={() => onValueChange && onValueChange(color)}
        />
      ))}
      <Input width="130px" m={1} size="sm" height={38} maxLength={9} value={value} onChangeText={(text) => onValueChange && onValueChange(text)} />
    </HStack>

    </>
  );
}
