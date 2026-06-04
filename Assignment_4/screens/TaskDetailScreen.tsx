import React, { useCallback } from "react"
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"

import type { RootStackParamList } from "../types"
import { useTasks } from "../store/TaskContext"
import NotificationToggle from "../components/NotificationToggle"
import { sendTestPush } from "../api/backendService"

type Props = NativeStackScreenProps<RootStackParamList, "TaskDetail">

export default function TaskDetailScreen({ route, navigation }: Props) {
  const { taskId } = route.params
  const { getTask, toggleReminder, deleteTask } = useTasks()
  const task = getTask(taskId)

  const handleDelete = useCallback(() => {
    Alert.alert("Delete task", "This will also cancel its reminder.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteTask(taskId)
          navigation.goBack()
        },
      },
    ])
  }, [taskId, deleteTask, navigation])

  const handleTestPush = useCallback(async () => {
    if (!task) return
    try {
      await sendTestPush({
        title: "TaskPing",
        body: task.title,
        data: { taskId: task.id },
      })
      Alert.alert("Sent", "A test push was requested from the backend.")
    } catch (err) {
      Alert.alert("Failed", err instanceof Error ? err.message : "Could not send push.")
    }
  }, [task])

  if (!task) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.missing}>This task no longer exists.</Text>
          <Pressable style={styles.linkBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.linkBtnText}>Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    )
  }

  const due = new Date(task.dueDate)

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{task.title}</Text>

        <View style={styles.metaCard}>
          <Text style={styles.metaLabel}>Due</Text>
          <Text style={styles.metaValue}>{due.toLocaleString()}</Text>
        </View>

        {task.notes ? (
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Notes</Text>
            <Text style={styles.metaValue}>{task.notes}</Text>
          </View>
        ) : null}

        <NotificationToggle
          label="Reminder"
          description={
            task.reminderEnabled
              ? "A local notification is scheduled for this task."
              : "Turn on to schedule a local notification."
          }
          value={task.reminderEnabled}
          onValueChange={(enabled) => toggleReminder(task.id, enabled)}
        />

        <Pressable style={styles.testBtn} onPress={handleTestPush}>
          <Text style={styles.testBtnText}>Send Test Push (via backend)</Text>
        </Pressable>

        <Pressable style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.deleteBtnText}>Delete Task</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8FAFC" },
  content: { padding: 16, gap: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  missing: { fontSize: 16, color: "#475569", marginBottom: 12 },
  title: { fontSize: 24, fontWeight: "800", color: "#0F172A" },
  metaCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  metaLabel: { fontSize: 13, color: "#64748B", marginBottom: 4 },
  metaValue: { fontSize: 16, color: "#0F172A", fontWeight: "500" },
  testBtn: {
    backgroundColor: "#0F172A",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  testBtnText: { color: "#FFFFFF", fontWeight: "600", fontSize: 15 },
  deleteBtn: {
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  deleteBtnText: { color: "#DC2626", fontWeight: "700", fontSize: 15 },
  linkBtn: { paddingVertical: 8, paddingHorizontal: 16 },
  linkBtnText: { color: "#2563EB", fontWeight: "600", fontSize: 16 },
})
