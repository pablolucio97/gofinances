import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import {
    Container,
    Header,
    LogoTitle,
    Title,
    SignInTitle,
    TitleWrapper,
    Footer,
    FooterWrapper
} from './styles'

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'

import { SignInSocialButton } from '../../components/SignInSocialButton'
import { useAuth } from '../../hooks/auth'
import { ActivityIndicator, Alert, Platform } from 'react-native'
import { APPLE_AUTH_ERROR, GOOGLE_AUTH_ERROR } from '../../utils/constants'
import { useTheme } from 'styled-components'


export function SignIn() {

    const [isLoading, setIsLoading] = useState(false)

    const theme = useTheme()
    const { signInWithGoogle, signInWithApple } = useAuth()

    async function handleSignInWithGoogle() {
        try {
            setIsLoading(true)
            return await signInWithGoogle()
        } catch (error) {
            console.log(error)
            Alert.alert(GOOGLE_AUTH_ERROR)
            setIsLoading(false)
        }
    }

    async function handleSignInWithApple() {
        try {
            setIsLoading(true)
            return await signInWithApple()
        } catch (error) {
            console.log(error)
            Alert.alert(APPLE_AUTH_ERROR)
            setIsLoading(false)
        }
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(120)}
                        height={RFValue(64)}
                    />
                    <LogoTitle>gofinances</LogoTitle>
                </TitleWrapper>
                <Title>
                    Controle suas{'\n'}
                    finanças de forma{'\n'}
                    muito simples
                </Title>
                <SignInTitle>
                    Faça seu login {'\n'}
                    com uma das contas abaixo
                </SignInTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                        activeOpacity={.8}
                        title='Entrar com Google'
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />
                    {Platform.OS === 'ios' &&
                        <SignInSocialButton
                            activeOpacity={.8}
                            title='Entrar com Apple'
                            svg={AppleSvg}
                            onPress={handleSignInWithApple}
                        />}
                </FooterWrapper>
                {isLoading &&
                    <ActivityIndicator
                        color={theme.colors.shape}
                        size='large'
                    />
                }
            </Footer>
        </Container>
    )
}
