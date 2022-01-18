import { createContext, ReactNode} from 'react'

type UserProps = {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

type AuthContextProps = {
    isAuthenticated: boolean
    user: UserProps
}

type ChildrenProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider ({children} : ChildrenProps ) {

    const fakeUser = {
        id: '1283',
        name: 'Pablo',
        email: 'pablo@gmail.com',
        photo: 'http://'
    }

    return(
        <AuthContext.Provider value={{ user: fakeUser, isAuthenticated: false}}>
            {children}
        </AuthContext.Provider>
    )
}



