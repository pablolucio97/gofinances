import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

interface TransactionProps{
  type: 'positive' | 'negative'
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 4px;
  padding: 16px 24px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Amount = styled.Text<TransactionProps>`
  font-size: ${RFValue(16)}px;
  margin-top: 2px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme, type }) => type === 'positive' ? theme.colors.sucesss : theme.colors.atention};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

export const Date = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CategoryName = styled.Text`
  margin-left: 16px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text};
`;
