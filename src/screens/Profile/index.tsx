import React from 'react';
import { Text, TextInput, Button } from 'react-native'

import { Container } from './styles';

export function Profile() {
  return (
    <Container>
      <Text
        testID='test-title'
      >
        Profile
      </Text>
      <TextInput
        placeholder="Nome"
        autoCorrect={false}
        key='anykey'
        testID='test-name'
        value='Pablo'
      />
      <TextInput
        placeholder="Sobrenome"
        autoCorrect={false}
      />
      <Button
        title='Salvar'
        onPress={() => { }}
      />
    </Container>
  )
}