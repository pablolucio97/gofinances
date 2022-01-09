import React, { useState } from 'react'
import { Button } from '../../components/Forms/Button'
import { CategorySelect } from '../../components/Forms/CategorySelect'
import { Input } from '../../components/Forms/Input'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'
import {
    Container, Fields, Form, Header,
    Title, TransactionsTypes
} from './styles'

export function Register() {

    const [selectedTransactionType, setSelectedTransactionType] = useState('')

    function handleTransactionType(transactionType: 'up' | 'down') {
        setSelectedTransactionType(transactionType)
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <Input
                        placeholder='Nome'
                    />
                    <Input
                        placeholder='Email'
                    />
                    <TransactionsTypes>
                        <TransactionTypeButton
                            title='Income'
                            type='up'
                            isActive={selectedTransactionType === 'up'}
                            onPress={() => handleTransactionType('up')}
                        />
                        <TransactionTypeButton
                            title='Outcome'
                            type='down'
                            isActive={selectedTransactionType === 'down'}
                            onPress={() => handleTransactionType('down')}
                        />
                    </TransactionsTypes>
                    <CategorySelect 
                        title='Selecione'
                    />
                </Fields>
                <Button
                    label='Enviar'
                />
            </Form>
        </Container>
    )
}
