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

interface Props {
    title: string;
    amount: string;
    lastTransaction: string;
    type: 'total' | 'down' | 'up';
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
}

export function HihghlightCard({
    title,
    amount,
    lastTransaction,
    type

}: Props) {
    return (
        <Container
            type={type}
        >
            <Header
                type={type}
            >
                <Title type={type}>
                    {title}
                </Title>
                <Icon name={icon[type]} type={type} />
            </Header>
            <Footer>
                <Amount type={type}>
                    {amount}
                </Amount>
                <LastTransaction type={type}>
                    {lastTransaction}
                </LastTransaction>
            </Footer>
        </Container>
    )
}
