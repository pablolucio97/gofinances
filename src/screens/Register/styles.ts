import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(112)}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 16px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const Fields = styled.View``;

export const Form = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: space-between;
`;

export const TransactionsTypes = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`
