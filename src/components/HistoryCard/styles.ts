import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface Props {
  color: string;
}

export const Container = styled.View<Props>`
  width: 96%;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.shape};
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 24px;
  border-radius: 4px;
  border-left-width: 4px;
  border-left-color: ${({ color }) => color};
  margin: 8px 24px 4px 8px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(12)}px;
`;
