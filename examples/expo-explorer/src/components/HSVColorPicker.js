import React from "react";
import { View, StyleSheet } from "react-native";
import {
  SliderHuePicker,
  SliderSaturationPicker,
  SliderValuePicker,
} from "react-native-slider-color-picker";
import { Box } from "native-base";
import Color from "color";
import tinycolor from "tinycolor2";

const TrackImage = require("react-native-slider-color-picker/brightness_mask.png");

export default function HSVColorPicker({ value = "#000", onValueChange }) {
  const onChangeColor = (colorHsvOrRgb, resType) => {
    if (resType === "end") {
      const {h,s,v,a} = colorHsvOrRgb
      const newColor = tinycolor(colorHsvOrRgb).toHexString();
      onValueChange && onValueChange(newColor);
    }
  };
  const color = Color(value);
  const hueValue = color.hue();
  const saturationPickerBgColor = Color({ h: hueValue, s: 1, v: 1 }).hex();

  return (
    <Box position="relative" padding={2}>
      <Box height={12}>
        <SliderHuePicker
          oldColor={value}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          useNativeDriver={true}
          onColorChange={onChangeColor}
        />
      </Box>
      <Box height={12}>
        <SliderSaturationPicker
          oldColor={value}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          useNativeDriver={true}
          onColorChange={onChangeColor}
          style={[
            styles.picker,
            {
              backgroundColor: saturationPickerBgColor,
            },
          ]}
        />
      </Box>
      <Box height={12}>
        <SliderValuePicker
          oldColor={value}
          minimumValue={0.02}
          step={0.05}
          trackStyle={styles.track}
          trackImage={TrackImage}
          thumbStyle={styles.thumb}
          onColorChange={onChangeColor}
          style={styles.picker}
        />
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  track: { height: 12, width: "100%"},
  picker: { height: 12, borderRadius: 6, backgroundColor: "black" },
  thumb: {
    width: 20,
    height: 20,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
});
