import React from "react"
import { Linking, Pressable, StyleSheet, Text, View } from "react-native"
import type { PermissionStatus } from "../notifications/notificationService"

interface PermissionBannerProps {
  status: PermissionStatus
  onRequest: () => void
}

/**
 * Shows contextual UI based on notification permission state:
 *  - undetermined: prompt to enable
 *  - denied: explain + deep-link to system settings
 *  - granted: renders nothing
 */
export default function PermissionBanner({ status, onRequest }: PermissionBannerProps) {
  if (status === "granted") return null

  const denied = status === "denied"

  return (
    <View style={[styles.banner, denied ? styles.denied : styles.prompt]}>
      <Text style={styles.title}>
        {denied ? "Notifications are turned off" : "Enable reminders"}
      </Text>
      <Text style={styles.body}>
        {denied
          ? "TaskPing can't remind you until notifications are enabled in your device settings."
          : "Allow notifications so TaskPing can remind you about your tasks on time."}
      </Text>

      <Pressable
        style={styles.button}
        onPress={denied ? () => Linking.openSettings() : onRequest}
      >
        <Text style={styles.buttonText}>
          {denied ? "Open Settings" : "Allow Notifications"}
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  prompt: { backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" },
  denied: { backgroundColor: "#FEF2F2", borderColor: "#FECACA" },
  title: { fontSize: 16, fontWeight: "700", color: "#0F172A", marginBottom: 4 },
  body: { fontSize: 14, color: "#475569", marginBottom: 12, lineHeight: 20 },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: { color: "#FFFFFF", fontWeight: "600", fontSize: 14 },
})
