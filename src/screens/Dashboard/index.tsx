import React, { useEffect, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import { ActivityIndicator } from 'react-native'

import { HihghlightCard } from '../../components/HighlightCard'
import { useTheme } from 'styled-components'
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
    LoadingContainer
} from './styles'

import { ASYNC_STORAGE_TRANSACTIONS_KEY, GITHUB_PROFILE_URL } from '../../utils/constants'

export interface DataListProps extends TransactionProps {
    id: string;
}

interface HighlightCardProps {
    amount: string;
}

interface HilighDataCardProp {
    entries: HighlightCardProps;
    expansives: HighlightCardProps;
    total: HighlightCardProps
}

export function Dashboard() {

    const theme = useTheme()

    const [isLoading, setIsLoading] = useState(true)
    const [trasactions, setTransactions] = useState<DataListProps[]>([])
    const [highlighData, setHighlighData] = useState<HilighDataCardProp>({} as HilighDataCardProp)

   
    async function loadTransactions() {

        let entriesTotal = 0;
        let expansivesTotal = 0;n

        const response = await AsyncStorage.getItem(ASYNC_STORAGE_TRANSACTIONS_KEY)
        const transactions = response ? JSON.parse(response) : []


        const formatedTransactions: DataListProps[] = transactions.map((transaction: DataListProps) => {
            const amount = Number(transaction.amount).toLocaleString('ptBR', {
                style: 'currency',
                currency: 'BRL'
            })


            if (transaction.type === 'positive') {
                entriesTotal += Number(transaction.amount)
            } else {
                expansivesTotal += Number(transaction.amount)
            }

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
        
        setTransactions(formatedTransactions)

        const total = Number(entriesTotal - expansivesTotal)

        setHighlighData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            expansives: {
                amount: expansivesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
        })

        setIsLoading(false)

    }

    useEffect(() => {
        loadTransactions()
    }, [])


    useFocusEffect(useCallback(() => {
        loadTransactions()
    }, []))

    return (
        <Container>
            {isLoading ?
                <LoadingContainer>
                    <ActivityIndicator
                        color={theme.colors.secondary}
                        size='large'
                    />
                </LoadingContainer>
                :
                <>
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
                            title='Entradas'
                            amount={highlighData?.entries?.amount}
                            lastTransaction='8 de janeiro de 2022'
                            type='up'
                        />
                        <HihghlightCard
                            title='Saídas'
                            amount={highlighData?.expansives?.amount}
                            lastTransaction='28 de fervereiro de 2021'
                            type='down'
                        />
                        <HihghlightCard
                            title='Total'
                            amount={highlighData?.total?.amount}
                            lastTransaction='8 de janeiro de 2021'
                            type='total'
                        />
                    </HighlightCards>
                    <Transactions>
                        <Title>Listagem</Title>
                        <TransactionsList
                            //@ts-ignore
                            data={trasactions}
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
                </>
            }
        </Container>
    )
}
