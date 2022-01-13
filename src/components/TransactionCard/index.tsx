import React from 'react'
import { categories } from '../../utils/categories'
import {
    Container,
    Title,
    Amount,
    Footer,
    Date,
    Category,
    CategoryName,
    Icon
} from './styles'


export interface TransactionProps {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

export interface Props {
    data: TransactionProps
}


export function TransactionCard({
    data
}: Props) {

    const category = categories.filter(cagetory => cagetory.key === data.category)[0]

    return (
        <Container>
            <Title>{data.name}</Title>
            <Amount type={data.type}>
                {data.type === 'negative' && '- '}
                {data.amount}
            </Amount>
            <Footer>
                <Category>
                    <Icon name={category.icon} />
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>
        </Container>
    )
}
