import React from 'react'

import {
    Container,
    Header,
    Icon,
    Footer,
    Amount,
    LastTransaction,
    Title
} from './styles'

export default function index() {
    return (
        <Container>
            <Header>
                <Title>Entrada</Title>
                <Icon name='arrow-up-circle' />
            </Header>
            <Footer>
                <Amount>R$ 17.400,00</Amount>
                <LastTransaction>Última entrada dia 13 de abril</LastTransaction>
            </Footer>
        </Container>
    )
}
