import React, { useState } from 'react'
import {
    Keyboard,
    Modal,
    TouchableWithoutFeedback,
    Alert
} from 'react-native'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '../../components/Forms/Button'
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton'
import { InputForm } from '../../components/Forms/InputForm'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'
import { CategorySelect } from '../CategorySelect'
import {
    Container,
    Fields,
    Form,
    Header,
    Title,
    TransactionsTypes,
    SentButton

} from './styles'
import {
    CATEGORY_INPUT_MISSING,
    ITEM_INPUT_MISSING,
    PRICE_INPUT_MISSING,
    PRICE_SHOULD_BE_POSITIVE,
    TITLE_OBLIGATORY_FILED,
    TRANSACTION_TYPE_INPUT_MISSING
} from '../../utils/constants'

interface FormDataProps {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name:
        Yup.string()
            .required(ITEM_INPUT_MISSING),
    amount:
        Yup.number()
            .typeError(PRICE_INPUT_MISSING)
            .positive(PRICE_SHOULD_BE_POSITIVE)
            .required(PRICE_INPUT_MISSING)
})


export function Register() {

    const { handleSubmit, control, formState: { errors } }
        = useForm({ resolver: yupResolver(schema) })

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

    function handleRegister(form: FormDataProps) {

        if (!selectedTransactionType)
            return Alert.alert(TITLE_OBLIGATORY_FILED, TRANSACTION_TYPE_INPUT_MISSING)

        if (category.key === 'category')
            return Alert.alert(TITLE_OBLIGATORY_FILED, CATEGORY_INPUT_MISSING)

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType: selectedTransactionType,
            category: category.key
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm
                            placeholder='Item'
                            name='name'
                            control={control}
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            placeholder='Preço'
                            keyboardType='numeric'
                            name='amount'
                            control={control}
                            error={errors.amount && errors.amount.message}
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
                    <SentButton>
                        <Button
                            label='Enviar'
                            onPress={handleSubmit(handleRegister)}
                        />
                    </SentButton>
                </Form>
                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategory}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    )
}
