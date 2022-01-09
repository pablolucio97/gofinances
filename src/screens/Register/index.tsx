import React, { useState } from 'react'
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from './styles'
import { Input } from '../../components/Forms/Input'
import { Button } from '../../components/Forms/Button'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'

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
                </Fields>
                <Button
                    label='Enviar'
                />
            </Form>
        </Container>
    )
}
