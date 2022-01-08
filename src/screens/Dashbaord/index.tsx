import React from 'react'
import HighlightCard from '../../components/HighlightCard'
import { GITHUB_PROFILE_URL } from '../../utils/constants'
import {
    Container,
    Header,
    User,
    UserInfo,
    UserGreetings,
    UserName,
    Photo,
    UserWrapper,
    PowerIcon,
    HighlightCards
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
                    <PowerIcon name='power' />
                </UserWrapper>
            </Header>
            <HighlightCards
              
            >
                <HighlightCard />
                <HighlightCard />
                <HighlightCard />
            </HighlightCards>
        </Container>
    )
}
