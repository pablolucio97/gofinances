import React from 'react'
import { ViewStyle } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

import { categories } from '../../utils/categories'

import {
    Container,
    Title,
    Amount,
    Footer,
    Date,
    Category,
    CategoryName,
    Icon,
    Button,
} from './styles'


export interface TransactionProps {
    type?: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

export interface Props extends ViewStyle {
    data: TransactionProps
    deleteTransaction?: (id: unknown) => void
}


export function TransactionCard({
    data,
    deleteTransaction,
    ...rest
}: Props) {

    const category = categories.filter(cagetory => cagetory.key === data.category)[0]

    const { colors } = useTheme()

    return (
        <Container {...rest}>
            <Title>{data.name}</Title>
            <Amount type={data.type as 'positive' || 'negative'}>
                {data.type === 'negative' && '- '}
                {data.amount}
            </Amount>
            <Footer>
                <Category>
                    <Icon name={category.icon} />
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
                <Button
                    onPress={deleteTransaction}
                >
                    <Feather
                        name='trash'
                        size={16}
                        color={colors.shape}
                    />
                </Button>
            </Footer>
        </Container>
    )
}
