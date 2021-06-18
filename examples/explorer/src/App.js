import { BootstrapProvider } from "@bootstrap-styled/provider";
import {
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Option,
} from "@bootstrap-styled/v4";
import { useCallback, useEffect, useState } from "react";
import { TwitterPicker } from "react-color";
import IconsetListView from "./components/IconListView";
import IconsetInfoPanel from "./components/IconsetPanel";
import Picker from "./components/Picker";
import Toolbar from "./components/Toolbar";
import { iconsets } from "./config";

export default function App() {
  const [currentIconsetIndex, setIconsetIndex] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [currentVariant, setVariant] = useState("regular");
  const onChangeIconset = useCallback((newIndex) => {
    setIconsetIndex(newIndex);
    setVariant("regular");
    setMaxIconsShown(100);
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
  const [maxIconsShown, setMaxIconsShown] = useState(50);

  const matchedIconNames = !isSearchMode
    ? iconNames
    : iconNames.filter((name) => name.includes(keyword));


  useEffect(() => {
    if (!iconsetInfo.resources || typeof iconsetInfo.resources !== "function" || iconsetInfo.__loaded){
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

  const onShowMore = () => setMaxIconsShown(maxIconsShown + 50);
  return (
    <BootstrapProvider>
      <div className="App">
        <div className="wrapper">
          <aside>
            <div style={{ marginBottom: 20 }}>
              <h1>svgr-iconkit</h1>
              <i>SVG Iconkit for React</i>
              <p>
                Inspired by{" "}
                <a href="https://github.com/gregberge/svgr" target="_blank">
                  gregberge/svgr
                </a>{" "}
                and{" "}
                <a
                  href="https://github.com/oblador/react-native-vector-icons"
                  target="_blank"
                >
                  oblador/react-native-vector-icons
                </a>
                , the kit set for rendering SVG based icon content in
                React.js/React-Native.
              </p>
              <Form>
                <FormGroup>
                  <Input
                    type="select"
                    onChange={(evt) => onChangeIconset(evt.target.value)}
                  >
                    {iconsets.map(({ name, packageName }, index) => (
                      <Option key={packageName} value={index}>
                        {name}
                      </Option>
                    ))}
                  </Input>
                </FormGroup>
              </Form>
            </div>
            <IconsetInfoPanel
              variantName={currentVariant}
              keyword={keyword}
              onKeywordChange={setKeyword}
              onVariantChange={setVariant}
              iconsetInfo={iconsetInfo}
              iconSize={iconSize}
              iconColor={iconColor}
            />
          </aside>
          <main>
            <Toolbar>
              <div>
                <ButtonGroup>
                  {[16, 24, 32, 48].map((value) => (
                    <Button
                      onClick={() => setIconSize(value)}
                      key={`$size-${value}`}
                      color={iconSize === value ? "primary" : "default"}
                    >
                      {value}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <div>
                <ButtonGroup>
                  {[
                    { value: true, label: "styled-components" },
                    { value: false, label: "props" },
                  ].map(({ value, label }) => (
                    <Button
                      onClick={() => setUsingStyledComponent(value)}
                      key={`$stylingprops-${value}`}
                      color={
                        isUsingStyledComponent === value ? "primary" : "default"
                      }
                    >
                      {label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <Picker
                isOpen={isColorPickerOpen}
                onClose={() => setColorPickerOpen(false)}
                content={
                  <TwitterPicker
                    color={iconColor}
                    onChangeComplete={(color) => setIconColor(color.hex)}
                  />
                }
              >
                <ButtonGroup>
                  <Button
                    onClick={() => setColorPickerOpen(true)}
                    color="light"
                    style={{ backgroundColor: iconColor }}
                  >
                    {iconColor}
                  </Button>
                </ButtonGroup>
              </Picker>
              <div>
                <Form inline className="my-2 my-lg-0">
                  <InputGroup>
                    <Input
                      type="text"
                      value={keyword}
                      placeholder="Search icons..."
                      onChange={(evt) => {
                        setKeyword(evt.target.value);
                        setMaxIconsShown(100);
                      }}
                    />
                  </InputGroup>
                </Form>
              </div>
            </Toolbar>
            <div>
              {isSearchMode && (
                <span>
                  {matchedIconNames.length} icon(s) matched by given keyword.
                </span>
              )}
            </div>

            <IconsetListView
              variantName={currentVariant}
              keyword={keyword}
              iconSize={iconSize}
              iconColor={iconColor}
              iconsetInfo={iconsetInfo}
              isUsingStyledComponent={isUsingStyledComponent}
              matchedIconNames={matchedIconNames}
              maxIconsShown={maxIconsShown}
              isSearchMode={isSearchMode}
              onShowMore={onShowMore}
            />
          </main>
        </div>
      </div>
    </BootstrapProvider>
  );
}
