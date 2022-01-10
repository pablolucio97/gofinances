import React, { useState } from 'react'
import { Modal } from 'react-native'
import { Button } from '../../components/Forms/Button'
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton'
import { Input } from '../../components/Forms/Input'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'
import { CategorySelect } from '../CategorySelect'
import {
    Container, Fields, Form, Header,
    Title, TransactionsTypes
} from './styles'

export function Register() {

    const [selectedTransactionType, setSelectedTransactionType] = useState('')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })

    function handleTransactionType(transactionType: 'up' | 'down') {
        setSelectedTransactionType(transactionType)
    }

    function handleCloseSelectCategory() {
        setCategoryModalOpen(false)
    }
    function handleOpenSelectCategory() {
        setCategoryModalOpen(true)
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
                    <CategorySelectButton
                        title={category.name}
                        onPress={handleOpenSelectCategory}
                    />
                </Fields>
                <Button
                    label='Enviar'
                    onPress={handleOpenSelectCategory}
                />
            </Form>
            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategory}
                />
            </Modal>
        </Container>
    )
}
