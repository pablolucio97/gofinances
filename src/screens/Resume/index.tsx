import React from 'react'
import { View, Text } from 'react-native'
import { HistoryCard } from '../../components/HistoryCard'

import {
    Container,
    Title,
    Header
} from './styles'

export  function Resume() {
    return (
        <Container>
            <Header>
                <Title>Resumo</Title>
            </Header>
            <HistoryCard
                amount='R$150,00'
                color='red'
                title='Compras'
            />

        </Container>
    )
}
