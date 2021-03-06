import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface Props {
  
}

export const Button = styled(RectButton)<Props>`
  height: ${RFValue(56)}px;
  background-color: ${({ theme }) => theme.colors.shape};

  border-radius: 4px;

  flex-direction: row;
  align-items: center;

  margin-bottom: 16px;
`;

export const ImageContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: ${RFValue(16)}px;
  border-color: ${({ theme }) => theme.colors.background};
  border-width: 1px;
  border-radius: 4px;
`;

export const Title = styled.Text`
  flex: 1;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.medium};
`;
