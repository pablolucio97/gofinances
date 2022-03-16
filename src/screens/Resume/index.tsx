import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import { VictoryPie } from 'victory-native'
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useFocusEffect } from '@react-navigation/native'


import {
    Container,
    Title,
    Header,
    Content,
    LoadingContainer,
    ChartContainer,
    ExpensivesContainer,
    MonthSelectButton,
    Month,
    MonthSelect,
    MonthSelectIcon,
} from './styles'
import { HistoryCard } from '../../components/HistoryCard'
import { ASYNC_STORAGE_TRANSACTIONS_KEY } from '../../utils/constants'
import { categories } from '../../utils/categories'
import { RFValue } from 'react-native-responsive-fontsize'
import {useAuth} from '../../hooks/auth'


export interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    name: string;
    key: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
}

export function Resume() {

    const theme = useTheme()
    const { userInfo } = useAuth()

    const [totalByCategory, setTotalByCategory] = useState<CategoryData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState(new Date())

    function handleDateChange(action: 'previous' | 'next') {
        if (action === 'next') {
            setSelectedDate(addMonths(selectedDate, 1))
        } else {
            setSelectedDate(subMonths(selectedDate, 1))
        }
    }


    async function loadData() {
        setIsLoading(true)
        const response = await AsyncStorage.getItem(`${ASYNC_STORAGE_TRANSACTIONS_KEY}${userInfo.id}`)
        const responseFormatted = response ? JSON.parse(response) : []

        try {
            const expensives = responseFormatted.filter((expansive: TransactionData) =>
                expansive.type === 'negative' &&
                new Date(expansive.date).getMonth() === selectedDate.getMonth() &&
                new Date(expansive.date).getFullYear() === selectedDate.getFullYear()
            )
            const expensiveTotalGraph = expensives.reduce((acc: number, expensive: TransactionData) => {
                return acc + Number(expensive.amount)
            }, 0)

            const totalByCategory: CategoryData[] = []

            categories.forEach(category => {
                let categorySum = 0

                expensives.forEach((expansive: TransactionData) => {
                    if (expansive.category === category.key) {
                        categorySum += Number(expansive.amount)
                    }
                })

                if (categorySum > 0) {
                    const totalFormatted = categorySum.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })

                    const percent = `${(categorySum / expensiveTotalGraph * 100).toFixed(0)}%`

                    totalByCategory.push({
                        name: category.name,
                        key: category.key,
                        color: category.color,
                        total: categorySum,
                        totalFormatted,
                        percent
                    })
                }
            })
            setTotalByCategory(totalByCategory)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }



    useFocusEffect(
        useCallback(() => {
            loadData()
        }, [selectedDate]))


    return (
        <Container>
            <Header>
                <Title>Resumo</Title>
            </Header>

            {
                isLoading ?
                    <LoadingContainer>
                        <ActivityIndicator
                            size='large'
                            color={theme.colors.secondary}
                        />
                    </LoadingContainer>

                    :
                    <Content
                    >

                        <MonthSelect>
                            <MonthSelectButton
                                onPress={() => handleDateChange('previous')}
                            >
                                <MonthSelectIcon name='chevron-left' />
                            </MonthSelectButton>
                            <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>
                            <MonthSelectButton
                                onPress={() => handleDateChange('next')}
                            >
                                <MonthSelectIcon name='chevron-right' />
                            </MonthSelectButton>
                        </MonthSelect>
                        <ChartContainer>
                            <VictoryPie
                                data={totalByCategory}
                                width={272}
                                height={272}
                                x='percent'
                                y='total'
                                colorScale={totalByCategory.map(category => category.color)}
                                style={{
                                    labels: {
                                        fontSize: RFValue(12),
                                        fill: theme.colors.shape
                                    },
                                    data: {
                                        height: RFValue(64)
                                    },
                                }}
                                labelRadius={40}
                            />
                        </ChartContainer>

                        <ExpensivesContainer>
                            {
                                totalByCategory.map(item => (
                                    <HistoryCard
                                        amount={item.totalFormatted}
                                        key={item.key}
                                        color={item.color}
                                        title={item.name}
                                    />
                                ))
                            }
                        </ExpensivesContainer>
                    </Content>
            }

        </Container>
    )
}
