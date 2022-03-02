import React from 'react'
import { Container, Icon, Title } from './styles'
import { RectButtonProps } from 'react-native-gesture-handler'

interface Props extends RectButtonProps {
    title: string;
    onPress: () => void;
}

export function CategorySelectButton({ title, onPress, testID }: Props) {
    return (
        <Container onPress={onPress} testID={testID} >
            <Title>{title}</Title>
            <Icon name='chevron-down' />
        </Container>
    )
}
