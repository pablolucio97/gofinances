import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface Props {}

export const Container = styled.TouchableOpacity<Props>`
  width: 100%;
  padding: 16px;

  background-color: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.text_dark};
  border-radius: 4px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.text};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
