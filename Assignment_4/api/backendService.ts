/**
 * Client wrapper around the Express backend.
 *  - registerPushToken: send this device's Expo token to the server
 *  - sendTestPush: ask the server to deliver a push via the Expo Push API
 */
import { API_KEY, BACKEND_URL } from "../constants/config"
import type { NotificationData } from "../types"

async function request<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Request to ${path} failed (${res.status}): ${text}`)
  }

  return (await res.json()) as T
}

/** Register / upsert this device's Expo push token with the backend. */
export async function registerPushToken(token: string): Promise<{ ok: boolean }> {
  return request<{ ok: boolean }>("/register-token", {
    token,
    platform: "expo",
  })
}

/**
 * Trigger a remote push notification through the backend (which calls the
 * Expo Push API). Useful for testing the full server -> device round trip.
 */
export async function sendTestPush(params: {
  token?: string
  title: string
  body: string
  data?: NotificationData
}): Promise<{ ok: boolean; tickets?: unknown }> {
  return request<{ ok: boolean; tickets?: unknown }>("/send-notification", {
    token: params.token, // optional: omit to broadcast to all registered tokens
    title: params.title,
    body: params.body,
    data: params.data ?? {},
  })
}

export const backendService = {
  registerPushToken,
  sendTestPush,
}

export default backendService
