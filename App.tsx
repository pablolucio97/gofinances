import React from 'react';
import { SafeAreaView } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { Dashboard } from './src/screens/Dashbaord';
import theme from './src/global/styles/theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
        <Dashboard />
    </ThemeProvider>
  );
}
