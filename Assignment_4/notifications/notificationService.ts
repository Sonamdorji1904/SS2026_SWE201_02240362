/**
 * All notification logic lives here using ONLY expo-notifications.
 *
 * Responsibilities:
 *  - Configure the foreground handler (toast-style feedback)
 *  - Create the Android notification channel
 *  - Request / check permissions
 *  - Fetch the Expo push token
 *  - Schedule and cancel local notifications by date/time
 *  - Provide listeners for received (foreground) and tapped notifications
 */
import { Platform } from "react-native"
import * as Notifications from "expo-notifications"
import { ANDROID_CHANNEL, EAS_PROJECT_ID } from "../constants/config"
import type { NotificationData } from "../types"

/**
 * Foreground handler — controls what happens when a notification arrives while
 * the app is open. We show an alert/banner + play sound so the user still gets
 * "toast-style" feedback even in the foreground.
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

/**
 * Create the Android notification channel. Must be called before scheduling on
 * Android or notifications may be silent / not appear.
 */
export async function configureAndroidChannel(): Promise<void> {
  if (Platform.OS !== "android") return

  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL.id, {
    name: ANDROID_CHANNEL.name,
    description: ANDROID_CHANNEL.description,
    importance: Notifications.AndroidImportance.HIGH,
    sound: "default",
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#2563EB",
    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
  })
}

export type PermissionStatus = "granted" | "denied" | "undetermined"

/** Returns the current permission status without prompting. */
export async function getPermissionStatus(): Promise<PermissionStatus> {
  const { status } = await Notifications.getPermissionsAsync()
  return status as PermissionStatus
}

/**
 * Requests notification permission. Returns the resulting status.
 * Safe to call repeatedly — if already granted it resolves immediately.
 */
export async function requestPermissions(): Promise<PermissionStatus> {
  const current = await Notifications.getPermissionsAsync()
  if (current.granted) return "granted"

  const { status } = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
    },
  })
  return status as PermissionStatus
}

/**
 * Fetches the Expo push token for this environment. Requires granted
 * permissions and a compatible runtime/build configuration.
 */
export async function getExpoPushToken(): Promise<string | null> {
  const status = await requestPermissions()
  if (status !== "granted") return null

  try {
    const response = await Notifications.getExpoPushTokenAsync(
      EAS_PROJECT_ID ? { projectId: EAS_PROJECT_ID } : undefined,
    )
    return response.data
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    if (message.includes("Default FirebaseApp is not initialized")) {
      console.error(
        "[notifications] Android push token setup is incomplete. Add Firebase/FCM credentials (google-services.json) and complete the Expo push-notifications guide, then rebuild the app.",
      )
    } else {
      console.error("[notifications] Failed to get Expo push token:", err)
    }
    return null
  }
}

/**
 * Schedule a local notification at a specific date/time.
 * Returns the notification identifier (used to cancel it later).
 */
export async function scheduleTaskNotification(params: {
  title: string
  body: string
  date: Date
  data: NotificationData
}): Promise<string> {
  const { title, body, date, data } = params

  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: "default",
      data, // includes taskId for deep-link navigation
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date,
      channelId: Platform.OS === "android" ? ANDROID_CHANNEL.id : undefined,
    },
  })

  return identifier
}

/** Cancel a previously scheduled notification by its identifier. */
export async function cancelTaskNotification(identifier?: string): Promise<void> {
  if (!identifier) return
  try {
    await Notifications.cancelScheduledNotificationAsync(identifier)
  } catch (err) {
    console.warn("[notifications] cancel failed (already fired?):", err)
  }
}

/** Cancel ALL scheduled notifications. */
export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync()
}

/** List all currently scheduled notifications (debugging / sync). */
export async function getScheduledNotifications() {
  return Notifications.getAllScheduledNotificationsAsync()
}

/**
 * Subscribe to notifications received while the app is in the FOREGROUND.
 * Use this to show toast-style feedback. Returns an unsubscribe function.
 */
export function addForegroundListener(
  callback: (notification: Notifications.Notification) => void,
): () => void {
  const sub = Notifications.addNotificationReceivedListener(callback)
  return () => sub.remove()
}

/**
 * Subscribe to notification taps (works for background & quit states once the
 * app is opened). Use this to navigate to TaskDetailScreen. Returns unsubscribe.
 */
export function addResponseListener(
  callback: (response: Notifications.NotificationResponse) => void,
): () => void {
  const sub = Notifications.addNotificationResponseReceivedListener(callback)
  return () => sub.remove()
}

/**
 * If the app was launched by tapping a notification (cold start), this returns
 * that initial response so you can deep-link on startup.
 */
export async function getInitialNotificationResponse() {
  return Notifications.getLastNotificationResponseAsync()
}

/** Helper to safely extract the taskId from a notification response. */
export function extractTaskId(
  response: Notifications.NotificationResponse | null,
): string | null {
  const data = response?.notification.request.content.data as
    | NotificationData
    | undefined
  return data?.taskId ?? null
}
