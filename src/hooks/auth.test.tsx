import 'jest-fetch-mock';

import { renderHook, act } from '@testing-library/react-hooks'
import { mocked } from 'ts-jest/utils';
import fetchMock from 'jest-fetch-mock';
import { startAsync } from 'expo-auth-session';
import { AuthProvider } from '../contexts/AuthContext'
import { useAuth } from './auth'

jest.mock('expo-auth-session');

fetchMock.enableMocks();


describe('Auth Hooks', () => {
    it('should be able to signIn with Goggle account exisitng', async () => {
        
        const googleMocked = mocked(startAsync as any)

        googleMocked.mockReturnValueOnce({
            type: 'success',
            params: {
                access_token: 'any_token',
            }
        })
        
        
        fetchMock.mockResponseOnce(JSON.stringify(
            {
                id: 'ksdjf87dsfh',
                email: 'pablo-test@gmail.com',
                name: 'Pablo',
                photo: 'pablo.png'
            }
        ))        

        const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        })

         act(async () => await result.current.signInWithGoogle())
        await waitForNextUpdate()

        console.log("USER PROFILE =>", result.current.userInfo);
        expect(result.current.userInfo.email).toBe('pablo-test@gmail.com')

    })
})