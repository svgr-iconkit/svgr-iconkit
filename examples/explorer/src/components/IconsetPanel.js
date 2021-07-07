import {
  Button,
  ButtonGroup,
  Card,
  CardBlock,
  CardLink,
  CardSubtitle,
  CardText,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "@bootstrap-styled/v4";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { useCallback, useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
require("codemirror/mode/javascript/javascript");

const codemirrorOptions = { mode: "javascript", lineNumbers: true };

const createWebExample = ({
  packageName,
  variantName = "regular",
  iconName = "arrow-left",
  iconSize = 24,
  iconColor = "#000",
}) => `
import React from 'react';
import Icon from '${packageName}';

export default function App() {
  return (<div>
    <Icon name="${iconName}" variant="${variantName}" size={${iconSize}} color="${iconColor}" />
  </div>)
}
`;
const createNativeExample = ({
  packageName,
  variantName = "regular",
  iconName = "arrow-left",
  iconSize = 24,
  iconColor = "#000",
}) => `
import React from 'react';
import { View } from 'react-native';
import Icon from '${packageName}';

export default function App() {
  return (<View>
    <Icon name="${iconName}" variant="${variantName}" size={${iconSize}} color="${iconColor}" />
  </View>)
}
`;

export default function IconsetPanel({
  onVariantChange,
  variantName,
  iconsetInfo,
  iconSize,
  iconColor,
}) {
  const { name: familyName, packageName, variantNames = [], iconNames = [] } =
    iconsetInfo || {};
  const options = {
    packageName,
    variantName,
    iconName: iconNames[0],
    iconColor,
    iconSize,
  };
  const codeWeb = createWebExample(options);
  const codeNative = createNativeExample(options);

  const [usageTabIndex, setUsageTabIndex] = useState(0);

  const [isUsageModalShow, setUsageModalShow] = useState(false);
  const handleClose = useCallback(() => {
    setUsageModalShow(false);
  }, []);

  return (
    <>
      <Card>
        <CardBlock>
          <Row>
            <Col>
              <CardTitle>{familyName}</CardTitle>
              <CardText>Total {iconNames.length} icon(s).</CardText>
              <CardSubtitle>Package name:</CardSubtitle>
              <code>{packageName}</code>
            </Col>
            <Col>
              {variantNames && variantNames.length > 0 && (
                <div>
                  <CardSubtitle>Variants:</CardSubtitle>
                  <ButtonGroup>
                    {variantNames.map((name) => (
                      <Button
                        key={name}
                        onClick={() => onVariantChange(name)}
                        color={variantName === name ? "primary" : "light"}
                      >
                        {name}
                      </Button>
                    ))}
                  </ButtonGroup>
                </div>
              )}
              <CardLink
                href="#"
                onClick={() => setUsageModalShow(true)}
                color="link"
              >
                How to use?
              </CardLink>
            </Col>
          </Row>
        </CardBlock>
      </Card>

      <Modal fade size="lg" isOpen={isUsageModalShow} toggle={handleClose}>
        <ModalHeader toggle={handleClose}>Usage example</ModalHeader>
        <ModalBody>
          <Nav tabs>
            <NavItem>
              <NavLink
                onClick={() => setUsageTabIndex(0)}
                active={usageTabIndex === 0}
              >
                React.js in Web
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => setUsageTabIndex(1)}
                active={usageTabIndex === 1}
              >
                React Native
              </NavLink>
            </NavItem>
          </Nav>
          {usageTabIndex === 0 && (
            <div>
              <CodeMirror options={codemirrorOptions} value={codeWeb} />
            </div>
          )}
          {usageTabIndex === 1 && (
            <div>
              <CodeMirror options={codemirrorOptions} value={codeNative} />
            </div>
          )}
        </ModalBody>
      </Modal>
    </>
  );
}
