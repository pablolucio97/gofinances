import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { Dashboard } from './src/screens/Dashboard';
import { Register } from './src/screens/Register';
import theme from './src/global/styles/theme'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium
} from '@expo-google-fonts/poppins'



export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if(!fontsLoaded){
    return(
      <AppLoading />
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Register />
    </ThemeProvider>
  );
}
