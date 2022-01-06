import React from 'react'
import { View, Text } from 'react-native'


type WelcomeProps = {
    name: string
}


export  function Welcome({name} : WelcomeProps) {
    return (
        <View>
            <Text>Welcome, {name}</Text>
        </View>
    )
}
