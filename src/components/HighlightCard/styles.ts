import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface TypeProps {
  type: "total" | "down" | "up";
}

export const Container = styled.View<TypeProps>`
  background: ${({ theme }) => theme.colors.shape};
  width: ${RFValue(300)}px;
  padding: 12px 24px;
  padding-bottom: ${RFValue(16)}px;
  border-radius: 4px;
  margin-right: 16px;

  ${(props) =>
    props.type === "total" &&
    css`
      background: ${({ theme }) => theme.colors.secondary};
    `}
`;

export const Header = styled.View<TypeProps>`
  flex-direction: row;
  justify-content: space-between;
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;

  ${(props) =>
    props.type === "up" &&
    css`
      color: ${({ theme }) => theme.colors.sucesss};
    `}

  ${(props) =>
    props.type === "down" &&
    css`
      color: ${({ theme }) => theme.colors.atention};
    `}

  ${(props) =>
    props.type === "total" &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text_dark};

  ${(props) =>
    props.type === "total" &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme }) => theme.colors.text_dark};
  margin-top: 40px;
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
  ${(props) =>
    props.type === "total" &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;
