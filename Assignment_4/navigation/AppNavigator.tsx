import React, { useEffect, useRef } from "react"
import { NavigationContainer, type NavigationContainerRef } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import type { RootStackParamList } from "../types"
import HomeScreen from "../screens/HomeScreen"
import TaskDetailScreen from "../screens/TaskDetailScreen"
import SettingsScreen from "../screens/SettingsScreen"
import {
  addResponseListener,
  extractTaskId,
  getInitialNotificationResponse,
} from "../notifications/notificationService"

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigator() {
  const navRef = useRef<NavigationContainerRef<RootStackParamList>>(null)

  // Handle taps on background/quit notifications -> deep link to TaskDetail.
  useEffect(() => {
    let mounted = true

    // Cold start: app opened from a notification tap.
    ;(async () => {
      const initial = await getInitialNotificationResponse()
      const taskId = extractTaskId(initial)
      if (mounted && taskId) {
        // Defer until the navigator is ready.
        setTimeout(() => navRef.current?.navigate("TaskDetail", { taskId }), 300)
      }
    })()

    // Warm start: tapped while app is in background.
    const unsubscribe = addResponseListener((response) => {
      const taskId = extractTaskId(response)
      if (taskId) {
        navRef.current?.navigate("TaskDetail", { taskId })
      }
    })

    return () => {
      mounted = false
      unsubscribe()
    }
  }, [])

  return (
    <NavigationContainer ref={navRef}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTitleStyle: { fontWeight: "700", color: "#0F172A" },
          headerTintColor: "#2563EB",
          contentStyle: { backgroundColor: "#F8FAFC" },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "TaskPing" }} />
        <Stack.Screen
          name="TaskDetail"
          component={TaskDetailScreen}
          options={{ title: "Task" }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings" }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
