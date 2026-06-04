import React, { useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"

import AppNavigator from "./navigation/AppNavigator"
import { TaskProvider } from "./store/TaskContext"
import { configureAndroidChannel } from "./notifications/notificationService"

export default function App() {
  // Set up the Android notification channel once on launch.
  useEffect(() => {
    configureAndroidChannel()
  }, [])

  return (
    <SafeAreaProvider>
      <TaskProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </TaskProvider>
    </SafeAreaProvider>
  )
}
