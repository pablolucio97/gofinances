import  React from 'react'
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
import {useAuth} from '../../hooks/auth'
import { Alert } from 'react-native'
import { GOOGLE_AUTH_ERROR } from '../../utils/constants'


export function SignIn() {

    const {signInWithGoogle} = useAuth()

    async function handleSignInWithGoogle(){
        try {
           await signInWithGoogle()
        } catch (error) {
            console.log(error)
            Alert.alert(GOOGLE_AUTH_ERROR)
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
                <SignInSocialButton 
                    activeOpacity={.8}
                    title='Entrar com Apple'
                    svg={AppleSvg}
                />
                </FooterWrapper>
            </Footer>
        </Container>
    )
}
