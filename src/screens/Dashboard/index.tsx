import React, { useEffect, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import { HihghlightCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionProps } from '../../components/TransactionCard'
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
    LogoutButton,
} from './styles'

import { ASYNC_STORAGE_TRANSACTIONS_KEY, GITHUB_PROFILE_URL } from '../../utils/constants'

export interface DataListProps extends TransactionProps {
    id: string;
}

export function Dashboard() {



    const [data, setData] = useState<DataListProps[]>([])



    async function loadTransactions() {
        const response = await AsyncStorage.getItem(ASYNC_STORAGE_TRANSACTIONS_KEY)
        const transactions = response ? JSON.parse(response) : []

        const formatedTransactions: DataListProps[] = transactions.map((transaction: DataListProps) => {
            const amount = Number(transaction.amount).toLocaleString('ptBR', {
                style: 'currency',
                currency: 'BRL'
            })

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(transaction.date))

            return {
                id: transaction.id,
                name: transaction.name,
                amount,
                type: transaction.type,
                date,
                category: transaction.category
            }

        })


        setData(formatedTransactions)
    }

    useEffect(() => {
        loadTransactions()
    }, [])


    useFocusEffect(useCallback(() => {
        loadTransactions()
    }, []))

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
                    <LogoutButton onPress={() => { }}>
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
