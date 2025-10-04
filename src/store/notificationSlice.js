import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    visible: false,
    type: "success" // success, error, info
  },
  reducers: {
    showNotification(state, action) {
      state.message = action.payload.message
      state.type = action.payload.type || "success"
      state.visible = true
    },
    hideNotification(state) {
      state.visible = false
      state.message = ""
    }
  }
})

export const notificationActions = notificationSlice.actions
export default notificationSlice