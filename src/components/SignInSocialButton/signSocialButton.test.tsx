import React from 'react';
import {render} from '@testing-library/react-native'
import {SignInSocialButton} from './'
import GoogleSvg from '../../assets/google.svg'
import theme from '../../global/styles/theme';
import { ThemeProvider } from 'styled-components/native';

const Providers : React.FC = ({children}) => {
    return(
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

describe('SignInSocialButton component', () => {
    it('should render correctly', () => {
        const { getByTestId } = render(
        <SignInSocialButton 
            title='Sign In'
            //@ts-ignore
            svg={String(GoogleSvg)}
            testID='social-button-test'
        />,
        {
            wrapper: Providers
        }
        )
        const signSocialButton = getByTestId('social-button-test')
        expect(signSocialButton.props.activeOpacity).toEqual(0.105)
    }
    )
})