import React, { useCallback, useEffect, useState } from "react"
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { BACKEND_URL } from "../constants/config"
import {
  cancelAllNotifications,
  getExpoPushToken,
  getPermissionStatus,
  getScheduledNotifications,
  requestPermissions,
  type PermissionStatus,
} from "../notifications/notificationService"
import { registerPushToken } from "../api/backendService"
import NotificationToggle from "../components/NotificationToggle"

export default function SettingsScreen() {
  const [permission, setPermission] = useState<PermissionStatus>("undetermined")
  const [token, setToken] = useState<string | null>(null)
  const [scheduledCount, setScheduledCount] = useState(0)

  const refresh = useCallback(async () => {
    setPermission(await getPermissionStatus())
    const scheduled = await getScheduledNotifications()
    setScheduledCount(scheduled.length)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const handleTogglePermission = useCallback(
    async (enabled: boolean) => {
      if (!enabled) {
        Alert.alert(
          "Manage in Settings",
          "To turn off notifications, disable them in your device settings.",
        )
        return
      }
      const status = await requestPermissions()
      setPermission(status)
    },
    [],
  )

  const handleFetchToken = useCallback(async () => {
    const t = await getExpoPushToken()
    setToken(t)
    if (t) {
      try {
        await registerPushToken(t)
        Alert.alert("Registered", "Push token sent to the backend.")
      } catch (err) {
        Alert.alert("Failed", err instanceof Error ? err.message : "Could not register token.")
      }
    } else {
      Alert.alert(
        "Unavailable",
        "Could not fetch a push token on this runtime. Use a development build with notifications configured and permission granted.",
      )
    }
  }, [])

  const handleCancelAll = useCallback(async () => {
    await cancelAllNotifications()
    await refresh()
    Alert.alert("Cleared", "All scheduled notifications have been cancelled.")
  }, [refresh])

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <NotificationToggle
          label="Notifications"
          description={`Permission: ${permission}`}
          value={permission === "granted"}
          onValueChange={handleTogglePermission}
        />

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Backend</Text>
          <Text style={styles.cardValue}>{BACKEND_URL}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Scheduled notifications</Text>
          <Text style={styles.cardValue}>{scheduledCount}</Text>
        </View>

        {token ? (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Expo push token</Text>
            <Text style={styles.token} selectable>
              {token}
            </Text>
          </View>
        ) : null}

        <Pressable style={styles.primaryBtn} onPress={handleFetchToken}>
          <Text style={styles.primaryBtnText}>Fetch & Register Push Token</Text>
        </Pressable>

        <Pressable style={styles.secondaryBtn} onPress={refresh}>
          <Text style={styles.secondaryBtnText}>Refresh Status</Text>
        </Pressable>

        <Pressable style={styles.dangerBtn} onPress={handleCancelAll}>
          <Text style={styles.dangerBtnText}>Cancel All Reminders</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8FAFC" },
  content: { padding: 16, gap: 14 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  cardLabel: { fontSize: 13, color: "#64748B", marginBottom: 4 },
  cardValue: { fontSize: 15, color: "#0F172A", fontWeight: "500" },
  token: { fontSize: 12, color: "#0F172A", fontFamily: "monospace" },
  primaryBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 15 },
  secondaryBtn: {
    backgroundColor: "#E2E8F0",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryBtnText: { color: "#0F172A", fontWeight: "600", fontSize: 15 },
  dangerBtn: {
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  dangerBtnText: { color: "#DC2626", fontWeight: "700", fontSize: 15 },
})
