import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface NotificationAlert {
  id: string
  location: string
  filters: string
}

interface NotificationsState {
  alerts: NotificationAlert[]
}

const loadAlertsFromStorage = (): NotificationAlert[] => {
  if (typeof window !== "undefined") {
    const storedAlerts = localStorage.getItem("notificationAlerts")
    return storedAlerts ? JSON.parse(storedAlerts) : []
  }
  return []
}

const saveAlertsToStorage = (alerts: NotificationAlert[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("notificationAlerts", JSON.stringify(alerts))
  }
}

const initialState: NotificationsState = {
  alerts: loadAlertsFromStorage(),
}

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotificationAlert: (state, action: PayloadAction<Omit<NotificationAlert, "id">>) => {
      if (state.alerts.length < 2) {
        const newAlert = {
          id: Date.now().toString(),
          ...action.payload,
        }
        state.alerts.push(newAlert)
        saveAlertsToStorage(state.alerts)
      }
    },
    removeNotificationAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter((alert) => alert.id !== action.payload)
      saveAlertsToStorage(state.alerts)
    },
  },
})

export const { addNotificationAlert, removeNotificationAlert } = notificationsSlice.actions

export default notificationsSlice.reducer

