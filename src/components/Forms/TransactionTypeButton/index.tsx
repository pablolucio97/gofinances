import React from 'react'
import { Container, Title, Icon } from './styles'
import { TouchableOpacityProps } from 'react-native'

interface Props extends TouchableOpacityProps {
    title: string;
    isActive: boolean;
    type: 'up' | 'down';
}

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

export function TransactionTypeButton({ title, type, isActive, ...rest }: Props) {
    return (
        <Container
            //@ts-ignore
            isActive={isActive}
            type={type}
            {...rest}
        >
            <Icon
                type={type}
                name={icons[type]}
            />
            <Title>{title}</Title>
        </Container>
    )
}
