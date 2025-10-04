import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import cartSlice from "./cartSlice"
import notificationSlice from "./notificationSlice"
import { notification } from "antd"

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    notification: notificationSlice.reducer, // 通知
    //心愿单
  },
})

export default store
