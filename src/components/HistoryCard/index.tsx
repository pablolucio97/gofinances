import React from 'react'
import { ViewStyle } from 'react-native'
import {
    Container,
    Title,
    Amount
} from './styles'

interface Props extends ViewStyle {
    color: string;
    amount: string;
    title: string;
}

export function HistoryCard({ color, amount, title, ...rest }: Props) {
    return (
        <Container
            color={color}
            {...rest}
            >
            <Title>{title}</Title>
            <Amount>{amount}</Amount>
        </Container>
    )
}
