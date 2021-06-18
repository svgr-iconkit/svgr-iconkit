import styled from "styled-components";
import { position, layout, shadow, background, typography, compose } from "styled-system";

const Box = styled.div(compose(position, layout, shadow, background,typography));

export default Box;
