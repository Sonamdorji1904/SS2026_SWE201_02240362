/**
 * TaskPing backend — Express server.
 *
 * Responsibilities:
 *  - POST /register-token  : store an Expo push token (in-memory)
 *  - POST /send-notification : deliver a push via the Expo Push API
 *  - Basic API key check on protected routes (x-api-key header)
 *
 * Run with:  npx ts-node backend/index.ts   (or compile + node)
 *
 * NOTE: The in-memory store resets on restart. Swap for a real DB in prod.
 */
import express, { type NextFunction, type Request, type Response } from "express"

const app = express()
app.use(express.json())

const PORT = Number(process.env.PORT ?? 4000)
const API_KEY = process.env.API_KEY ?? "dev-public-key"
const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send"

/** In-memory token store. Keyed by token to dedupe. */
const tokens = new Set<string>()

/** Basic shared-key auth middleware. */
function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const provided = req.header("x-api-key")
  if (!provided || provided !== API_KEY) {
    return res.status(401).json({ ok: false, error: "Invalid or missing API key" })
  }
  next()
}

/** Validate that a token looks like an Expo push token. */
function isExpoToken(token: unknown): token is string {
  return (
    typeof token === "string" &&
    (token.startsWith("ExponentPushToken[") || token.startsWith("ExpoPushToken["))
  )
}

app.get("/health", (_req, res) => {
  res.json({ ok: true, registered: tokens.size })
})

/** Register / upsert a device push token. */
app.post("/register-token", requireApiKey, (req: Request, res: Response) => {
  const { token } = req.body ?? {}
  if (!isExpoToken(token)) {
    return res.status(400).json({ ok: false, error: "Invalid Expo push token" })
  }
  tokens.add(token)
  console.log(`[backend] registered token (${tokens.size} total)`)
  return res.json({ ok: true })
})

/**
 * Send a push notification.
 * Body: { token?, title, body, data }
 * If `token` is omitted, broadcasts to all registered tokens.
 */
app.post("/send-notification", requireApiKey, async (req: Request, res: Response) => {
  const { token, title, body, data } = req.body ?? {}

  if (typeof title !== "string" || typeof body !== "string") {
    return res.status(400).json({ ok: false, error: "title and body are required" })
  }

  const targets = token ? [token] : Array.from(tokens)
  if (targets.length === 0) {
    return res.status(400).json({ ok: false, error: "No registered tokens to send to" })
  }

  const messages = targets
    .filter((t) => isExpoToken(t))
    .map((to) => ({
      to,
      sound: "default",
      title,
      body,
      data: data ?? {},
      channelId: "task-reminders",
    }))

  try {
    const response = await fetch(EXPO_PUSH_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    })

    const result = await response.json()
    console.log(`[backend] sent ${messages.length} push message(s)`)
    return res.json({ ok: true, tickets: result })
  } catch (err) {
    console.error("[backend] push send failed:", err)
    return res.status(502).json({ ok: false, error: "Failed to reach Expo Push API" })
  }
})

app.listen(PORT, () => {
  console.log(`[backend] TaskPing server listening on http://localhost:${PORT}`)
})
