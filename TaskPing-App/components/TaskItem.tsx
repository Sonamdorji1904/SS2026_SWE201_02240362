import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import type { Task } from "../types"

interface TaskItemProps {
  task: Task
  onPress: (taskId: string) => void
}

function formatDue(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

/** A single row in the task list. */
export default function TaskItem({ task, onPress }: TaskItemProps) {
  const isPast = new Date(task.dueDate).getTime() < Date.now()

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={() => onPress(task.id)}
      accessibilityRole="button"
      accessibilityLabel={`Open task ${task.title}`}
    >
      <View style={styles.left}>
        <Text style={styles.title} numberOfLines={1}>
          {task.title}
        </Text>
        <Text style={[styles.due, isPast && styles.duePast]}>
          {isPast ? "Was due " : "Due "}
          {formatDue(task.dueDate)}
        </Text>
      </View>

      <View
        style={[styles.dot, task.reminderEnabled ? styles.dotOn : styles.dotOff]}
        accessibilityLabel={task.reminderEnabled ? "Reminder on" : "Reminder off"}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  pressed: { opacity: 0.7 },
  left: { flex: 1, paddingRight: 12 },
  title: { fontSize: 16, fontWeight: "600", color: "#0F172A" },
  due: { fontSize: 13, color: "#64748B", marginTop: 4 },
  duePast: { color: "#DC2626" },
  dot: { width: 12, height: 12, borderRadius: 6 },
  dotOn: { backgroundColor: "#22C55E" },
  dotOff: { backgroundColor: "#CBD5E1" },
})
