import React from 'react'
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

import {SignInSocialButton} from '../../components/SignInSocialButton'


export function SignIn() {
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
                    title='Entrar com Google'
                    svg={GoogleSvg}
                />
                <SignInSocialButton 
                    title='Entrar com Apple'
                    svg={AppleSvg}
                />
                </FooterWrapper>
            </Footer>
        </Container>
    )
}
