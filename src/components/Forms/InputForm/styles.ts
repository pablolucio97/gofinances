import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface Props {}

export const Container = styled.View<Props>`
  width: 100%;
`;

export const Error = styled.Text`
  color: ${({ theme }) => theme.colors.atention};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  margin: 0 4px 4px;
`;
