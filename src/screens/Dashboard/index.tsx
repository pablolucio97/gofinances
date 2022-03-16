import React, { useEffect, useState, useCallback } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import { ActivityIndicator } from 'react-native'
import { Button } from '../../components/Forms/Button'

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
  LoadingContainer,
  NewTransactionContainer,
  NewTransactionText
} from './styles'

import { ASYNC_STORAGE_TRANSACTIONS_KEY, } from '../../utils/constants'
import { useAuth } from '../../hooks/auth'

export interface DataListProps extends TransactionProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

interface StoredDataProps {
  id: string
  name: string
  amount: string
  type: string
  category: string
  date: string
}

export function Dashboard() {

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();
  const { signOut, userInfo } = useAuth()
  const navigation = useNavigation();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {
    const lastTransaction = new Date(
      Math.max.apply(Math, collection
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime())))

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
  }

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(`${ASYNC_STORAGE_TRANSACTIONS_KEY}${userInfo.id}`);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {

        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount)
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        }

      });



    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');


    const total = entriesTotal - expensiveTotal;
    const lastEntrieTransactionFormatted = entriesTotal > 0 ?
      `Última entrada:  ${lastTransactionEntries}` :
      'Ainda não foram registradas entradas'
    const lastExpensiveTransactionFormatted = expensiveTotal > 0 ?
      `Última saída:  ${lastTransactionExpensives}` :
      'Ainda não foram registradas saídas'
    const totalInterval = total !== 0 ? 
    lastExpensiveTransactionFormatted > lastEntrieTransactionFormatted ?
    `01 a ${lastTransactionExpensives}` :
    `01 a ${lastTransactionEntries}` :
    'Ainda não há valores para cálculo' 

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastEntrieTransactionFormatted,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastExpensiveTransactionFormatted,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval
      }
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, [transactions]);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  async function handleDeleteTransaction(id: unknown) {
    try {
      const storedData = await AsyncStorage.getItem(`${ASYNC_STORAGE_TRANSACTIONS_KEY}${userInfo.id}`)
      const storedDataFormated = storedData ? JSON.parse(storedData) : []

      const updatedStoredData = storedDataFormated
        .filter((item: StoredDataProps) => item.id !== id)

      const filteredTransactions = transactions
        .filter(item => item.id !== id)

      setTransactions(filteredTransactions)

      await AsyncStorage
        .setItem(`${ASYNC_STORAGE_TRANSACTIONS_KEY}${userInfo.id}`,
          JSON.stringify(updatedStoredData))

    } catch (error) {
      console.log(error)
    }
  }


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
                  source={{ uri: userInfo.photo }}
                />
                <User>
                  <UserGreetings>Olá,</UserGreetings>
                  <UserName>{userInfo.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton
                onPress={signOut}
                activeOpacity={.88}
              >
                <PowerIcon name='power' />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards
          >
            <HihghlightCard
              title='Entradas'
              amount={highlightData?.entries?.amount}
              lastTransaction={highlightData?.entries?.lastTransaction}
              type='up'
            />
            <HihghlightCard
              title='Saídas'
              amount={highlightData?.expensives?.amount}
              lastTransaction={highlightData?.expensives?.lastTransaction}
              type='down'
            />
            <HihghlightCard
              title='Total'
              amount={highlightData?.total?.amount}
              lastTransaction={highlightData?.total?.lastTransaction}
              type='total'
            />
          </HighlightCards>
          <Transactions>
            <Title>Todas as transações</Title>
            {transactions.length > 0 ?
              <TransactionsList
                //@ts-ignore
                data={transactions}
                //@ts-ignore
                keyExtractor={item => item.id}
                //@ts-ignore
                renderItem={({ item }) => (
                  <TransactionCard
                    data={item}
                    deleteTransaction={() => handleDeleteTransaction(item.id)}
                  />
                )}
              />
              :
              <NewTransactionContainer>
                <NewTransactionText>
                  Você ainda não possui transações. Cadastre uma transação agora mesmo.
                </NewTransactionText>
                <Button
                  label='Cadastrar nova transação'
                  //@ts-ignore
                  onPress={() => navigation.navigate('Cadastrar')}
                />
              </NewTransactionContainer>
            }
          </Transactions>
        </>
      }
    </Container>
  )
}
