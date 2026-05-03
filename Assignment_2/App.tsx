// App.tsx — Entry point of the Fitness Tracker app
// Renders the AppNavigator which contains all screens and navigation

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AppNavigator />
    </>
  );
}
