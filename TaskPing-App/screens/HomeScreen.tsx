import React, { useCallback, useEffect, useState } from "react"
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker"

import type { RootStackParamList } from "../types"
import { useTasks } from "../store/TaskContext"
import TaskItem from "../components/TaskItem"
import PermissionBanner from "../components/PermissionBanner"
import {
  addForegroundListener,
  getExpoPushToken,
  getPermissionStatus,
  requestPermissions,
  type PermissionStatus,
} from "../notifications/notificationService"
import { registerPushToken } from "../api/backendService"

type Props = NativeStackScreenProps<RootStackParamList, "Home">

export default function HomeScreen({ navigation }: Props) {
  const { tasks, addTask } = useTasks()

  const [title, setTitle] = useState("")
  const [dueDate, setDueDate] = useState<Date>(() => new Date(Date.now() + 60 * 60 * 1000))
  const [showPicker, setShowPicker] = useState(false)
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date")
  const [permission, setPermission] = useState<PermissionStatus>("undetermined")

  // Header button -> Settings.
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate("Settings")} hitSlop={12}>
          <Text style={styles.headerBtn}>Settings</Text>
        </Pressable>
      ),
    })
  }, [navigation])

  // Initial permission check + push token registration.
  useEffect(() => {
    ;(async () => {
      const status = await getPermissionStatus()
      setPermission(status)
      if (status === "granted") {
        const token = await getExpoPushToken()
        if (token) {
          try {
            await registerPushToken(token)
          } catch (err) {
            console.warn("[home] token registration failed:", err)
          }
        }
      }
    })()
  }, [])

  // Foreground notifications -> toast-style alert.
  useEffect(() => {
    const unsubscribe = addForegroundListener((notification) => {
      const { title: nTitle, body } = notification.request.content
      Alert.alert(nTitle ?? "Reminder", body ?? "")
    })
    return unsubscribe
  }, [])

  const handleRequestPermission = useCallback(async () => {
    const status = await requestPermissions()
    setPermission(status)
    if (status === "granted") {
      const token = await getExpoPushToken()
      if (token) {
        try {
          await registerPushToken(token)
        } catch (err) {
          console.warn("[home] token registration failed:", err)
        }
      }
    }
  }, [])

  const onChangePicker = useCallback(
    (event: DateTimePickerEvent, selected?: Date) => {
      // Android closes the picker on each step.
      if (Platform.OS === "android") setShowPicker(false)
      if (event.type === "dismissed" || !selected) return

      setDueDate((prev) => {
        const next = new Date(prev)
        if (pickerMode === "date") {
          next.setFullYear(selected.getFullYear(), selected.getMonth(), selected.getDate())
        } else {
          next.setHours(selected.getHours(), selected.getMinutes(), 0, 0)
        }
        return next
      })

      // On Android, chain date -> time selection.
      if (Platform.OS === "android" && pickerMode === "date") {
        setPickerMode("time")
        setTimeout(() => setShowPicker(true), 150)
      }
    },
    [pickerMode],
  )

  const openPicker = useCallback((mode: "date" | "time") => {
    setPickerMode(mode)
    setShowPicker(true)
  }, [])

  const handleAdd = useCallback(async () => {
    const trimmed = title.trim()
    if (!trimmed) {
      Alert.alert("Add a title", "Please enter a task title.")
      return
    }
    if (dueDate.getTime() <= Date.now()) {
      Alert.alert("Pick a future time", "The reminder time must be in the future.")
      return
    }
    if (permission !== "granted") {
      const status = await requestPermissions()
      setPermission(status)
    }
    await addTask({ title: trimmed, dueDate })
    setTitle("")
    setDueDate(new Date(Date.now() + 60 * 60 * 1000))
  }, [title, dueDate, permission, addTask])

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          contentContainerStyle={styles.list}
          data={tasks}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View>
              <PermissionBanner status={permission} onRequest={handleRequestPermission} />

              <View style={styles.form}>
                <Text style={styles.formLabel}>New task</Text>
                <TextInput
                  style={styles.input}
                  placeholder="What do you need to do?"
                  placeholderTextColor="#94A3B8"
                  value={title}
                  onChangeText={setTitle}
                  returnKeyType="done"
                />

                <View style={styles.dateRow}>
                  <Pressable style={styles.dateBtn} onPress={() => openPicker("date")}>
                    <Text style={styles.dateBtnText}>
                      {dueDate.toLocaleDateString()}
                    </Text>
                  </Pressable>
                  <Pressable style={styles.dateBtn} onPress={() => openPicker("time")}>
                    <Text style={styles.dateBtnText}>
                      {dueDate.toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </Text>
                  </Pressable>
                </View>

                {showPicker ? (
                  <DateTimePicker
                    value={dueDate}
                    mode={pickerMode}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={onChangePicker}
                  />
                ) : null}

                <Pressable style={styles.addBtn} onPress={handleAdd}>
                  <Text style={styles.addBtnText}>Add Reminder</Text>
                </Pressable>
              </View>

              <Text style={styles.sectionTitle}>
                Your tasks {tasks.length > 0 ? `(${tasks.length})` : ""}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TaskItem task={item} onPress={(id) => navigation.navigate("TaskDetail", { taskId: id })} />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No tasks yet. Add one above to get a reminder.</Text>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8FAFC" },
  flex: { flex: 1 },
  list: { padding: 16 },
  headerBtn: { color: "#2563EB", fontSize: 16, fontWeight: "600" },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
  },
  formLabel: { fontSize: 14, fontWeight: "700", color: "#0F172A", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#0F172A",
    marginBottom: 12,
  },
  dateRow: { flexDirection: "row", gap: 12, marginBottom: 12 },
  dateBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  dateBtnText: { fontSize: 15, color: "#0F172A", fontWeight: "500" },
  addBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  addBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 16 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#0F172A", marginBottom: 12 },
  empty: { textAlign: "center", color: "#94A3B8", marginTop: 24, fontSize: 14 },
})
