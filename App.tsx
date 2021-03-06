import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './src/routes/app.routes'
import theme from './src/global/styles/theme'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium
} from '@expo-google-fonts/poppins'
import { StatusBar } from 'react-native';
import { SignIn } from './src/screens/SignIn'
import { AuthProvider } from './src/contexts/AuthContext'
import { Routes } from './src/routes';
import { useAuth } from './src/hooks/auth';


export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  const {isAuthenticated} = useAuth()

  if (!fontsLoaded || isAuthenticated) {
    return (
      <AppLoading />
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle='light-content'
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
