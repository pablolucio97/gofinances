import React from 'react'
import HighlightCard from '../../components/HighlightCard'
import { GITHUB_PROFILE_URL } from '../../utils/constants'
import {
    Container,
    Header,
    User,
    UserInfo,
    UserGreetings,
    UserName,
    Photo,
    UserWrapper,
    PowerIcon,
    HighlightCards,
    Transactions,
    Title
} from './styles'

export function Dashboard() {
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{ uri: GITHUB_PROFILE_URL }}
                        />
                        <User>
                            <UserGreetings>Olá,</UserGreetings>
                            <UserName>Pablo Silva</UserName>
                        </User>
                    </UserInfo>
                    <PowerIcon name='power' />
                </UserWrapper>
            </Header>
            <HighlightCards
              
            >
                <HighlightCard
                    title='Entrada'
                    amount='R$17.400,00'
                    lastTransaction='8 de janeiro de 2022'
                    type='up'
                />
                <HighlightCard
                    title='Saída'
                    amount='R$300,00'
                    lastTransaction='28 de fervereiro de 2021'
                    type='down'
                />
                <HighlightCard
                    title='Total'
                    amount='R$17.100,00'
                    lastTransaction='8 de janeiro de 2021'
                    type='total'
                />
            </HighlightCards>
            <Transactions>
                <Title></Title>
            </Transactions>
        </Container>
    )
}
