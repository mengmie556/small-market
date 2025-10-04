import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Footer } from "./components/footer/Footer"
import { Header } from "./components/header/Header"
import { Product } from "./components/product/Product"
import { Account } from "./pages/account/Account"
import { Home } from "./pages/home/Home"
import { Login } from "./pages/login/Login"
import { Regsiter } from "./pages/login/Regsiter"
import { Order } from "./pages/order/Order"
import { Checkout } from "./pages/checkout/Checkout"
import { SearchResults } from "./pages/search/SearchResults"
import {HistoryOrder} from "./pages/historyorder/HistoryOrder"
import { useSelector } from "react-redux"
import { useState } from "react"

const App = () => {
  const isLoggIn = useSelector((state) => state.auth.isLoggIn)
  const cartItems = useSelector((state) => state.cart.itemsList)
  const [homeSearchQuery, setHomeSearchQuery] = useState('')
  // console.log(cartItems)
  const handleSearch = (query) => {
    setHomeSearchQuery(query)
  }

  // 处理热门标签搜索
  // const handleTagSearch = (tag) => {
  //   setHomeSearchQuery(tag)
  // }
  return (
    <>
      {isLoggIn && (
        <Router>
          <Header onSearch={handleSearch}/>
          <Routes>
            <Route path='/' element={<Home searchQuery={homeSearchQuery} />} />
            <Route path='/regsiter' element={<Regsiter />} />
            <Route path='/account' element={<Account />} />
            <Route path='/order' element={<Order />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/historyorder' element={<HistoryOrder />} />
            <Route path='/search' element={<SearchResults />} />
          </Routes>
          <Footer />
        </Router>
      )}
      {!isLoggIn && <Login />}
    </>
  )
}
export default App