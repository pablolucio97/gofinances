import React from 'react'
import { Container, Icon, Title } from './styles'
import { TouchableOpacityProps } from 'react-native'

interface Props extends TouchableOpacityProps {
    title: string;
}

export function CategorySelect({ title, ...rest }: Props) {
    return (
        <Container {...rest}>
            <Title>{title}</Title>
            <Icon name='chevron-down' />
        </Container>
    )
}
