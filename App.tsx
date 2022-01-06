import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Welcome } from './src/components/Welcome';
import { Dashboard } from './src/screens/dashboard';

export default function App() {
  return (
    <Dashboard />
  );
}
