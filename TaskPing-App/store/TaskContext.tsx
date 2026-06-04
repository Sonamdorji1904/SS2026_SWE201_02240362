/**
 * Lightweight in-memory task store using React Context.
 * Handles creating/updating/deleting tasks and keeps the scheduled local
 * notification in sync with each task's reminder state.
 */
import React, { createContext, useCallback, useContext, useMemo, useState } from "react"
import type { Task } from "../types"
import {
  cancelTaskNotification,
  scheduleTaskNotification,
} from "../notifications/notificationService"

interface TaskContextValue {
  tasks: Task[]
  getTask: (id: string) => Task | undefined
  addTask: (input: { title: string; notes?: string; dueDate: Date }) => Promise<Task>
  toggleReminder: (id: string, enabled: boolean) => Promise<void>
  deleteTask: (id: string) => Promise<void>
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined)

function makeId(): string {
  return `task_${Date.now()}_${Math.floor(Math.random() * 1e6)}`
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])

  const getTask = useCallback(
    (id: string) => tasks.find((t) => t.id === id),
    [tasks],
  )

  const addTask = useCallback<TaskContextValue["addTask"]>(async (input) => {
    const id = makeId()
    let notificationId: string | undefined

    // Only schedule if the due date is in the future.
    if (input.dueDate.getTime() > Date.now()) {
      notificationId = await scheduleTaskNotification({
        title: "Task reminder",
        body: input.title,
        date: input.dueDate,
        data: { taskId: id },
      })
    }

    const task: Task = {
      id,
      title: input.title,
      notes: input.notes,
      dueDate: input.dueDate.toISOString(),
      reminderEnabled: Boolean(notificationId),
      notificationId,
      createdAt: new Date().toISOString(),
    }

    setTasks((prev) => [task, ...prev])
    return task
  }, [])

  const toggleReminder = useCallback<TaskContextValue["toggleReminder"]>(
    async (id, enabled) => {
      const task = tasks.find((t) => t.id === id)
      if (!task) return

      if (enabled) {
        const date = new Date(task.dueDate)
        if (date.getTime() <= Date.now()) {
          // Can't schedule in the past.
          return
        }
        const notificationId = await scheduleTaskNotification({
          title: "Task reminder",
          body: task.title,
          date,
          data: { taskId: id },
        })
        setTasks((prev) =>
          prev.map((t) =>
            t.id === id ? { ...t, reminderEnabled: true, notificationId } : t,
          ),
        )
      } else {
        await cancelTaskNotification(task.notificationId)
        setTasks((prev) =>
          prev.map((t) =>
            t.id === id
              ? { ...t, reminderEnabled: false, notificationId: undefined }
              : t,
          ),
        )
      }
    },
    [tasks],
  )

  const deleteTask = useCallback<TaskContextValue["deleteTask"]>(
    async (id) => {
      const task = tasks.find((t) => t.id === id)
      await cancelTaskNotification(task?.notificationId)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    },
    [tasks],
  )

  const value = useMemo(
    () => ({ tasks, getTask, addTask, toggleReminder, deleteTask }),
    [tasks, getTask, addTask, toggleReminder, deleteTask],
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTasks(): TaskContextValue {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error("useTasks must be used within a TaskProvider")
  return ctx
}
