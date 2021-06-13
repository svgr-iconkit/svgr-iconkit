import { Button } from "@bootstrap-styled/v4";

export default function IconListView({
  iconsetInfo,
  matchedIconNames,
  variantName = "regular",
  keyword,
  iconSize,
  iconColor,
  isSearchMode = false,
  maxIconsShown = 50,
  onShowMore,
}) {
  const { iconNames, component: IconComponent, } = iconsetInfo;
  return (
    <>
      <ul className="list">
        {matchedIconNames.slice(0, maxIconsShown).map((name) => (
          <li key={name} className="item">
            <div className="graphic">{IconComponent && <IconComponent variant={variantName} size={iconSize} name={name} color={iconColor} />}</div>
            <div className="text">
              <code>{name}</code>
            </div>
          </li>
        ))}
      </ul>
      {matchedIconNames.length > 0 && matchedIconNames.length > maxIconsShown && maxIconsShown < iconNames.length && (
        <>
          <hr />
          <div>
            <Button onClick={() => onShowMore(50)}>Show more 50 icons</Button>
          </div>
        </>
      )}
    </>
  );
}
