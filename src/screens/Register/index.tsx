import React, { useState, useEffect } from 'react'
import {
    Keyboard,
    Modal,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

import { useForm } from 'react-hook-form'
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native'

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
    ASYNC_STORAGE_ERROR_TO_SAVE,
    ASYNC_STORAGE_TRANSACTIONS_KEY,
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


    const { handleSubmit, control, reset, formState: { errors } }
        = useForm({ resolver: yupResolver(schema) })

    const navigation: NavigationProp<ParamListBase> = useNavigation()

    const [selectedTransactionType, setSelectedTransactionType] = useState('')
    const [transactions, setTransactions] = useState([])
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })

    function handleTransactionType(transactionType: 'positive' | 'negative') {
        setSelectedTransactionType(transactionType)
    }

    function handleCloseSelectCategory() {
        setCategoryModalOpen(false)
    }

    function handleOpenSelectCategory() {
        setCategoryModalOpen(true)
    }

    async function handleRegister(form: FormDataProps) {

        if (!selectedTransactionType)
            return Alert.alert(TITLE_OBLIGATORY_FILED, TRANSACTION_TYPE_INPUT_MISSING)

        if (category.key === 'category')
            return Alert.alert(TITLE_OBLIGATORY_FILED, CATEGORY_INPUT_MISSING)

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: selectedTransactionType,
            category: category.key,
            date: new Date()
        }

        try {
            const data = await AsyncStorage.getItem(ASYNC_STORAGE_TRANSACTIONS_KEY)
            const storedTransactions = data ? JSON.parse(data) : [];

            const formatedData = [
                ...storedTransactions,
                newTransaction
            ]

            await AsyncStorage.setItem(ASYNC_STORAGE_TRANSACTIONS_KEY, JSON.stringify(formatedData))

            reset()
            setSelectedTransactionType('')
            setCategory({
                key: 'category',
                name: 'Categoria',
            })

            navigation.navigate('Listagem')


        } catch (error) {
            console.log(error)
            Alert.alert(ASYNC_STORAGE_ERROR_TO_SAVE)
        }
    }

  /*   useEffect(() => {
        async function getTransactions() {
            const storedTransactions = await AsyncStorage.getItem(ASYNC_STORAGE_TRANSACTIONS_KEY)
            setTransactions(JSON.parse(storedTransactions!))
        }
        getTransactions()
    }, []) */

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
                                isActive={selectedTransactionType === 'positive'}
                                onPress={() => handleTransactionType('positive')}
                            />
                            <TransactionTypeButton
                                title='Outcome'
                                type='down'
                                isActive={selectedTransactionType === 'negative'}
                                onPress={() => handleTransactionType('negative')}
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
