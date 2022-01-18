import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

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
`;

export const SentButton = styled(RectButton)``;

export const Content = styled.View`
  justify-content: center;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const ExpensivesContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 8px;
  margin-top: -40px;
  height: 220px;
`;

export const MonthSelectButton = styled.TouchableOpacity``;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;

export const MonthSelect = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 24px;
  padding-horizontal: 24px;
`;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;
