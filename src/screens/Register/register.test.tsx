import React from 'react';
import {render, fireEvent} from '@testing-library/react-native'
import {Register} from './'
import theme from '../../global/styles/theme';
import { ThemeProvider } from 'styled-components/native';

jest.mock('@react-navigation/native', () => {
    return {
      useNavigation: jest.fn()
    }
  })

const Providers : React.FC = ({children}) => {
    return(
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

describe('Register sreen', () => {
    it('should open modal category when user calls handleModal function', () => {
        const {getByTestId} = render(<Register/>, {
            wrapper: Providers
        })

        const categoryModal = getByTestId('modal-test')
        const categoryModalButton = getByTestId('button-category-test')
        fireEvent.press(categoryModalButton)

        expect(categoryModal.props.visible).toBeTruthy()

    })
})