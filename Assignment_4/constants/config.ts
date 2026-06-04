/**
 * Centralized, environment-based configuration.
 *
 * In Expo, public runtime values are exposed through `expo-constants`
 * (app.config / app.json -> `extra`) or via `process.env.EXPO_PUBLIC_*`
 * variables. We read both and fall back gracefully so nothing is hardcoded
 * as a secret in the client bundle.
 *
 * NEVER put real secret keys (e.g. server-side API keys) in client config.
 * The API key below is only an example "shared" key used to gate the demo
 * backend — in production use proper auth.
 */
import Constants from "expo-constants"

type Extra = {
  backendUrl?: string
  apiKey?: string
  projectId?: string
}

const extra: Extra = (Constants.expoConfig?.extra as Extra) ?? {}

/**
 * Base URL of the Express backend.
 * Set EXPO_PUBLIC_BACKEND_URL in your .env or `extra.backendUrl` in app.json.
 *
 * When testing on a physical device, `localhost` will NOT work — use your
 * machine's LAN IP (e.g. http://192.168.1.20:4000).
 */
export const BACKEND_URL =
  process.env.EXPO_PUBLIC_BACKEND_URL ?? extra.backendUrl ?? "http://localhost:4000"

/**
 * Shared API key sent with backend requests. This is a low-trust value for the
 * demo backend's basic key check — not a true secret.
 */
export const API_KEY = process.env.EXPO_PUBLIC_API_KEY ?? extra.apiKey ?? "dev-public-key"

/**
 * Your EAS project id, required by Expo to fetch a push token on a real build.
 * Find it in app.json -> expo.extra.eas.projectId or the Expo dashboard.
 */
export const EAS_PROJECT_ID =
  process.env.EXPO_PUBLIC_EAS_PROJECT_ID ??
  extra.projectId ??
  (Constants.expoConfig?.extra as { eas?: { projectId?: string } })?.eas?.projectId ??
  undefined

/** Android notification channel configuration. */
export const ANDROID_CHANNEL = {
  id: "task-reminders",
  name: "Task Reminders",
  description: "Reminders for your scheduled tasks",
} as const

export const config = {
  BACKEND_URL,
  API_KEY,
  EAS_PROJECT_ID,
  ANDROID_CHANNEL,
}

export default config
