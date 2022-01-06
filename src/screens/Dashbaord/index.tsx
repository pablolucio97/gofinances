import React from 'react'
import { GITHUB_PROFILE_URL } from '../../utils/constants'
import {
    Container,
    Header,
    User,
    UserInfo,
    UserGreetings,
    UserName,
    Photo,
    UserWrapper
} from './styles'

export function Dashboard() {
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{ uri: GITHUB_PROFILE_URL }}
                        />
                        <User>
                            <UserGreetings>Olá,</UserGreetings>
                            <UserName>Pablo Silva</UserName>
                        </User>
                    </UserInfo>
                </UserWrapper>
            </Header>
        </Container>
    )
}
