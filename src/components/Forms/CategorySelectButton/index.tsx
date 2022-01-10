import React from 'react'
import { Container, Icon, Title } from './styles'
import { TouchableOpacityProps } from 'react-native'

interface Props extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
}

export function CategorySelectButton({ title, onPress }: Props) {
    return (
        <Container onPress={onPress} >
            <Title>{title}</Title>
            <Icon name='chevron-down' />
        </Container>
    )
}
