import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import {TextInput} from 'react-native'

export const Container = styled(TextInput)`
    width: 100%;
    padding: 16px;
    font-size: ${RFValue(12)}px;
    background-color: ${({ theme }) => theme.colors.shape};
    color: ${({ theme }) => theme.colors.text_dark};
    border-radius: 4px;
    font-family: ${({ theme }) => theme.fonts.regular};
`



