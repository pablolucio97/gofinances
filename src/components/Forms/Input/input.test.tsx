import React from 'react';
import { Input } from './'
import { render } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'
import theme from '../../../global/styles/theme'

const Providers: React.FC = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

describe('Input component', () => {
    it('should contains borderColor when active', () => {
        const { getByTestId } = render(
            <Input
                testID='input-email'
                placeholder='E-mail'
                keyboardType='email-address'
                autoCorrect={false}
                active
            />,
            {
                wrapper: Providers
            }
        )

        const inputComponent = getByTestId('input-email')
        expect(inputComponent.props.style[0].borderColor).toEqual(theme.colors.atention)

    })
}) 