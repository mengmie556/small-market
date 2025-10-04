import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  //initialState 定义了购物车的初始状态
  initialState: {
    itemsList: [],  //购物车商品列表
    totalQuantity: 0, //商品总数
  },
  //reducer 函数接收当前的状态（state）和一个动作（action），并返回新的状态。
  reducers: { //函数 存方法
    clearCart(state){
      //清空购物车
      state.itemsList = []
      state.totalQuantity = 0
    },
    addToCart(state, action) {
      //触发时发送过来的数据可以是任何数据类型 payload
      const newItem = action.payload

      //check item is already exits
      const exitsItem = state.itemsList.find((item) => item.id === newItem.id)

      if (exitsItem) {
        exitsItem.quantity++
        exitsItem.totalPrice += newItem.price
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
          cover: newItem.cover,
        })
        state.totalQuantity++
      }
    },
    removeFromCart(state, action) {
      const id = action.payload
      const exitstingItem = state.itemsList.find((item) => item.id === id)
      if (exitstingItem.quantity === 1) {
        state.itemsList = state.itemsList.filter((item) => item.id !== id)
        state.totalQuantity--
      } else {
        exitstingItem.quantity--
        exitstingItem.totalPrice -= exitstingItem.price
      }
    },
  },
})

export const cartActions = cartSlice.actions
export default cartSlice
