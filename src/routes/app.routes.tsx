import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components'
import {MaterialIcons} from '@expo/vector-icons'


import { Register } from '../screens/Register'
import { Dashboard } from '../screens/Dashboard'
import { Resume } from '../screens/Resume'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {

    const theme = useTheme()

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: 88,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0
                }
            }}
        >
            <Screen
                options={{
                    tabBarIcon: ({ size, color }) => (
                   <MaterialIcons
                      name='format-list-bulleted'
                      size={size}
                      color={color}
                    />)
                }}
                component={Dashboard} name='Listagem'
            />
            <Screen
                options={{
                    tabBarIcon: ({ size, color }) => (
                    <MaterialIcons
                      name='attach-money'
                      size={size}
                      color={color}
                    />)
                }}
                component={Register} name='Cadastrar'
            />
            <Screen
                options={{
                    tabBarIcon: ({ size, color }) => (
                    <MaterialIcons
                      name='pie-chart'
                      size={size}
                      color={color}
                    />)
                }}
                component={Resume} name='Resumo'
            />
        </Navigator>
    )
}