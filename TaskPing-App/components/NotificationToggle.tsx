import React from "react"
import { StyleSheet, Switch, Text, View } from "react-native"

interface NotificationToggleProps {
  label: string
  description?: string
  value: boolean
  onValueChange: (value: boolean) => void
  disabled?: boolean
}

/** A labeled switch row used for enabling/disabling reminders. */
export default function NotificationToggle({
  label,
  description,
  value,
  onValueChange,
  disabled,
}: NotificationToggleProps) {
  return (
    <View style={[styles.row, disabled && styles.disabled]}>
      <View style={styles.text}>
        <Text style={styles.label}>{label}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: "#CBD5E1", true: "#93C5FD" }}
        thumbColor={value ? "#2563EB" : "#F1F5F9"}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  disabled: { opacity: 0.5 },
  text: { flex: 1, paddingRight: 12 },
  label: { fontSize: 16, fontWeight: "600", color: "#0F172A" },
  description: { fontSize: 13, color: "#64748B", marginTop: 2 },
})
