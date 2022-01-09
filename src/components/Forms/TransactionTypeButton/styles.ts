import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";

interface IconProps {
  type: "down" | "up";
}

interface ContainerProps {
  type: "down" | "up";
  isActive: boolean;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 4px;
  padding: 2px 56px;
  ${({isActive, type}) => isActive && type === 'up'  && css`
    background-color: ${({ theme }) => theme.colors.sucess_light};
    border: none;
  `}
  ${({isActive, type}) => isActive && type === 'down'  && css`
    background-color: ${({ theme }) => theme.colors.atention_light};
    border: none;
  `}
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin: 12px;
  color: ${({ theme, type }) =>
    type === "down" ? theme.colors.atention : theme.colors.sucesss};
`;
