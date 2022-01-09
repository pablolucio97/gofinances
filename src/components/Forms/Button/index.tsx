import React from 'react'
import { Container, Title } from './styles'
import { TouchableOpacityProps } from 'react-native'

interface Props extends TouchableOpacityProps{
    label: string
}

export function Button({ label,...rest } : Props) {
    return (
        <Container {...rest}>
            <Title>{label}</Title>
        </Container>
    )
}
