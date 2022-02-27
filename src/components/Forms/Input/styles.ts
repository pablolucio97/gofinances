import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";

interface Props {
  active?: boolean;
}

export const Container = styled(TextInput)<Props>`
  width: 100%;
  padding: 16px;
  font-size: ${RFValue(12)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.text_dark};
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-bottom: 12px;
  ${({ active }) =>
    active &&
    css`
      border-color: ${({ theme }) => theme.colors.atention};
      border-width: 2px;
      border-style: solid;
    `}
`;
