import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import {
    Container,
    Title,
    Header,
    Content,
    LoadingContainer
} from './styles'
import { HistoryCard } from '../../components/HistoryCard'
import { ASYNC_STORAGE_TRANSACTIONS_KEY } from '../../utils/constants'
import { categories } from '../../utils/categories'
import { useFocusEffect } from '@react-navigation/native'


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
    total: string;
    color: string;
}

export function Resume() {

    const theme = useTheme()

    const [totalByCategory, setTotalByCategory] = useState<CategoryData[]>([])
    const [isLoading, setIsLoading] = useState(true)


    async function loadData() {
        const response = await AsyncStorage.getItem(ASYNC_STORAGE_TRANSACTIONS_KEY)
        const responseFormatted = response ? JSON.parse(response) : []

        try {
            const expansives = responseFormatted.filter((expansive: TransactionData) => expansive.type === 'negative')

            const totalByCategory: CategoryData[] = []

            categories.forEach(category => {
                let categorySum = 0

                expansives.forEach((expansive: TransactionData) => {
                    if (expansive.category === category.key) {
                        categorySum += Number(expansive.amount)
                    }
                })

                if (categorySum > 0) {
                    const totalFormatted = categorySum.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })

                    totalByCategory.push({
                        name: category.name,
                        key: category.key,
                        color: category.color,
                        total: totalFormatted
                    })
                }
            })
            setTotalByCategory(totalByCategory)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadData()
    }, [])


    useFocusEffect(useCallback(() => {
        loadData()
    }, []))

    return (
        <Container>
            <Header>
                <Title>Resumo</Title>
            </Header>
            <Content
            >
                {
                    isLoading ?
                        <LoadingContainer>
                            <ActivityIndicator
                                size='large'
                                color={theme.colors.secondary}
                            />
                        </LoadingContainer>

                        :

                        totalByCategory.map(item => (
                            <HistoryCard
                                amount={item.total}
                                key={item.key}
                                color={item.color}
                                title={item.name}
                            />
                        ))
                }
            </Content>

        </Container>
    )
}
