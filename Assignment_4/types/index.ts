/** Shared domain types for the TaskPing app. */

export interface Task {
  id: string
  title: string
  notes?: string
  /** ISO string of when the reminder should fire. */
  dueDate: string
  /** Whether a local notification is currently scheduled for this task. */
  reminderEnabled: boolean
  /** The Expo notification identifier returned when scheduled (for cancel). */
  notificationId?: string
  createdAt: string
}

/** Data packed into a notification so we can deep-link when tapped. */
export interface NotificationData {
  taskId: string
  [key: string]: unknown
}

/** React Navigation param list for the root stack. */
export type RootStackParamList = {
  Home: undefined
  TaskDetail: { taskId: string }
  Settings: undefined
}
