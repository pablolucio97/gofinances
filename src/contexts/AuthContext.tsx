import { createContext, ReactNode, useState, useEffect } from 'react'
import * as AuthSession from 'expo-auth-session'
import * as AppleSession from 'expo-apple-authentication'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ASYNC_STORAGE_USER_AUTH_KEY } from '../utils/constants'

const {GOOGLE_CLIENT_ID} = process.env
const {REDIRECT_URI} = process.env

interface UserProps {
    id: string;
    name: string;
    email: string;
    photo?: string | undefined;
}

interface AuthContextProps {
    userInfo: UserProps
    signInWithGoogle(): Promise<void>
    signInWithApple(): Promise<void>
}

interface ChildrenProps {
    children: ReactNode
}

interface AuthResponseProps {
    params: {
        access_token: string
    },
    type: string;
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: ChildrenProps) {

    const [user, setUser] = useState<UserProps>({} as UserProps)
    const [isLoading, setIsLoading] = useState(true)

    async function signInWithGoogle() {
        try {
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthResponseProps

            if (type === 'success') {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
                const userInfo = await response.json()

                const userLogged = {
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture
                };
                setUser(userLogged)
                await AsyncStorage.setItem(ASYNC_STORAGE_USER_AUTH_KEY, JSON.stringify(userLogged))
            }
        } catch (error) {
            throw new Error(String(error))
        }
    }


    async function signInWithApple() {
        try {
            const credentials = await AppleSession.signInAsync({
                requestedScopes: [
                    AppleSession.AppleAuthenticationScope.FULL_NAME,
                    AppleSession.AppleAuthenticationScope.EMAIL,
                ]
            })
            if (credentials) {
                const userLogged = {
                    id: String(credentials.user),
                    email: credentials.email!,
                    name: credentials.fullName!.givenName!,
                    photo: undefined
                }
                setUser(userLogged)
                await AsyncStorage.setItem(ASYNC_STORAGE_USER_AUTH_KEY, JSON.stringify(userLogged))
            }
        } catch (error) {
            throw new Error(String(error))
        }
    }

    useEffect(() => {
        async function loadUserStorageData(){
            const userStoraged = await AsyncStorage.getItem(ASYNC_STORAGE_USER_AUTH_KEY)

            if(userStoraged){
                const userLogged = JSON.parse(userStoraged) as UserProps
                setUser(userLogged)
            }
            setIsLoading(false)
        }
        loadUserStorageData()
    }, [])

    return (
        <AuthContext.Provider value={{
            userInfo: user,
            signInWithGoogle,
            signInWithApple
        }}>
            {children}
        </AuthContext.Provider>
    )
}



