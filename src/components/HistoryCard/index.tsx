import React from 'react'
import { View, Text } from 'react-native'
import {
    Container,
    Title,
    Amount
 } from './styles'

interface HistoryCardProps{
    color: string;
    amount: string;
    title: string;
}

export function HistoryCard({color, amount, title} : HistoryCardProps) {
    return (
        <Container color={color}>
            <Title>{title}</Title>
            <Amount>{amount}</Amount>
        </Container>
    )
}
