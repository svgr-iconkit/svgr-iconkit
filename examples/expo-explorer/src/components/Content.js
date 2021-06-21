import React from "react";
import { Box } from "native-base";
import { ScrollView } from "react-native";

function Content({
  children,
  contentContainerStyle,
  padder = false,
  ...restProps
}) {
  const contentStyles = {};
  if (padder) {
    contentStyles.paddingTop = 20;
    contentStyles.paddingBottom = 20;
  }
  return (
    <ScrollView
      scrollIndicatorInsets={{ top: 4, bottom: 4, left: 4, right: 4 }}
      contentContainerStyle={[contentStyles, contentContainerStyle]}
      {...restProps}
    >
      {children}
    </ScrollView>
  );
}

export default Content;
