import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

export const Container = styled(TouchableOpacity)`
  width: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.medium};
`;
