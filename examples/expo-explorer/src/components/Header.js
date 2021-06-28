import React from "react";
import { Dimensions } from "react-native";
import { Box, SimpleGrid, Text } from "native-base";
import styled, { css } from "styled-components/native";

const HeaderWrapper = styled(Box)`
  position: relative;
`;

const HeaderBody = styled(Box)`
  background-color: #f8fafc;
  border-bottom-width: 1px;
  border-bottom-color: #f1f5f9;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
`;
HeaderBody.displayName = 'HeaderBody';

const HeaderRow = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
  padding-left: 8px;
  padding-right: 8px;
  position: relative;
`;
HeaderRow.displayName = 'HeaderRow';

const HeaderItem = styled(Box)`
  height: 40px;
  min-width: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 6px;
  margin-right: 6px;
  ${({ leftSide = false }) =>
    !!leftSide &&
    css`
      justify-content: flex-start;
    `}
  ${({ rightSide = false }) =>
    !!rightSide &&
    css`
      justify-content: flex-end;
    `}
`;
HeaderItem.displayName = 'HeaderItem';

function Header({ safeAreaTop, children, ...rest }) {
  return (
    <HeaderWrapper {...rest}>
      <HeaderBody safeAreaTop={safeAreaTop}>{children}</HeaderBody>
    </HeaderWrapper>
  );
}

Header.Item = HeaderItem;
Header.Row = HeaderRow;

export const Item = HeaderItem;

export default Header;
