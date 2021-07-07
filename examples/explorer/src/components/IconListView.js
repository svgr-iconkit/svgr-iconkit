import { Button } from "@bootstrap-styled/v4";

import styled from "styled-components";

const IconWrapper = styled.div`
  svg {
    color: ${({ color }) => color};
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
  }
`;

export default function IconListView({
  iconsetInfo,
  matchedIconNames,
  variantName = "regular",
  keyword,
  iconSize,
  iconColor,
  isSearchMode = false,
  isUsingStyledComponent = false,
  maxIconsShown = 50,
  onShowMore,
}) {
  const { iconNames = [], Iconset: IconComponent } = iconsetInfo || {};

  const styledProps: any = {};
  const iconProps: any = {};
  if (isUsingStyledComponent) {
    styledProps.size = iconSize;
    styledProps.color = iconColor;
  } else {
    iconProps.size = iconSize;
    iconProps.color = iconColor;
  }
  return (
    <IconWrapper {...styledProps}>
      <ul className="list">
        {matchedIconNames.slice(0, maxIconsShown).map((name) => (
          <li key={`${variantName}-${name}`} className="item">
            <div className="graphic">
              {IconComponent && (
                <IconComponent
                  variant={variantName}
                  name={name}
                  {...iconProps}
                />
              )}
            </div>
            <div className="text">
              <code>{name}</code>
            </div>
          </li>
        ))}
      </ul>
      {matchedIconNames.length > 0 &&
        matchedIconNames.length > maxIconsShown &&
        maxIconsShown < iconNames.length && (
          <>
            <hr />
            <div>
              <Button onClick={() => onShowMore(50)}>Show more 50 icons</Button>
            </div>
          </>
        )}
    </IconWrapper>
  );
}
