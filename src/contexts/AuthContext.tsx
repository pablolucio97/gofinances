import { createContext, ReactNode, useState } from 'react'
import * as AuthSession from 'expo-auth-session'

interface UserProps {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface AuthContextProps {
    userInfo: UserProps
    signInWithGoogle(): Promise<void>
}

interface ChildrenProps {
    children: ReactNode
}

interface AuthResponseProps {
    params : {
        access_token: string
    },
    type: string;
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: ChildrenProps) {

    const [user, setUser] = useState<UserProps>({} as UserProps)

    async function signInWithGoogle() {
        try {
            const CLIENT_ID = '258416252709-m06kf7imrjdu402snsap9befhfbsopav.apps.googleusercontent.com';
            const REDIRECT_URL = 'https://auth.expo.io/@pablolucio/gofinances';
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

            const {type, params}  = await AuthSession.startAsync({ authUrl }) as AuthResponseProps

            if(type === 'success'){
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
                const userInfo = await response.json()
                console.log(userInfo)
                setUser({
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture
                })
            }

        } catch (error) {
            throw new Error(String(error))
        }
    }

    return (
        <AuthContext.Provider value={{
            userInfo: user,
            signInWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    )
}



