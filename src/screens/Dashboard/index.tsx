import React from 'react'
import { HihghlightCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionProps } from '../../components/TransactionCard'
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
    Title,
    TransactionsList,
    LogoutButton
} from './styles'


export interface DataListProps extends TransactionProps {
    id: string;
}

export function Dashboard() {

    const data: DataListProps[] =
        [
            {
                id: '1',
                type: 'positive',
                title: 'Desenolvimento de site',
                category: {
                    name: 'Vendas',
                    icon: 'dollar-sign'
                },
                amount: 'R$2.400,00',
                date: '02/02/2022'
            },
            {
                id: '2',
                type: 'negative',
                title: 'Pizzaria',
                category: {
                    name: 'Alimentação',
                    icon: 'coffee'
                },
                amount: 'R$90,00',
                date: '02/02/2022'
            },
            {
                id: '3',
                type: 'positive',
                title: 'Desenolvimento de aplicativo',
                category: {
                    name: 'Vendas',
                    icon: 'dollar-sign'
                },
                amount: 'R$7.000,00',
                date: '02/02/2022'
            },
        ]


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
                    <LogoutButton onPress={() => {}}>
                        <PowerIcon name='power' />
                    </LogoutButton>
                </UserWrapper>
            </Header>
            <HighlightCards

            >
                <HihghlightCard
                    title='Entrada'
                    amount='R$17.400,00'
                    lastTransaction='8 de janeiro de 2022'
                    type='up'
                />
                <HihghlightCard
                    title='Saída'
                    amount='R$300,00'
                    lastTransaction='28 de fervereiro de 2021'
                    type='down'
                />
                <HihghlightCard
                    title='Total'
                    amount='R$17.100,00'
                    lastTransaction='8 de janeiro de 2021'
                    type='total'
                />
            </HighlightCards>
            <Transactions>
                <Title>Listagem</Title>
                <TransactionsList
                    //@ts-ignore
                    data={data}
                    //@ts-ignore
                    keyExtractor={item => item.id}
                    //@ts-ignore
                    renderItem={({ item }) => (
                        <TransactionCard
                            data={item}
                        />
                    )}
                />


            </Transactions>
        </Container>
    )
}
