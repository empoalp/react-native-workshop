import styled from "@emotion/styled";
import colors from "../colors";

export interface IHorizontanRuleProps {
  small?: boolean;
}

const HorizontalRule = styled.div<IHorizontanRuleProps>`
  height: ${props => (props.small ? "1px" : "4px")};
  background-color: #e0e0e0;
  background-image: linear-gradient(
    to right,
    ${colors.green} 20%,
    ${colors.brandBlue} 20%,
    ${colors.brandBlue} 40%,
    ${colors.brandPink} 40%,
    ${colors.brandPink} 60%,
    ${colors.brandOrange} 60%,
    ${colors.brandOrange} 80%,
    ${colors.brandYellow} 80%
  );
  background-size: ${props => (props.small ? "200px" : "500px")}
    ${props => (props.small ? "1px" : "4px")};
  background-repeat: no-repeat;
`;

export default HorizontalRule;
