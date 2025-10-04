import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button, Card, message } from 'antd'
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { cartActions } from "../../store/cartSlice"
import { Link as LINK } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./order.css"

export const Order = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.itemsList)
  const navigate = useNavigate()

  // 计算总金额
  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.totalPrice
  }, 0).toFixed(2)

  // 增加商品数量
  const handleIncrease = (item) => {
    dispatch(cartActions.addToCart({ 
      id: item.id, 
      name: item.name, 
      price: item.price 
    }))
  }

  // 减少商品数量
  const handleDecrease = (id) => {
    dispatch(cartActions.removeFromCart(id))
  }

  // 处理结算
  const handleCheckout = () => {
    if(totalAmount!== "0.00") {
       message.success('订单提交成功！')
       navigate("/checkout")
       dispatch(cartActions.clearCart()) // 清空购物车;
    // 这里可以添加更多结算逻辑 
    }else{
        message.error('购物车为空，请添加商品后再结算！')
    }
    
  }

  return (
    <div className="order-container">
      <h2>确认订单</h2>
      
      <div className="order-items">
        {cartItems.map((item) => (
          <Card key={item.id} className="order-item">
            <div className="item-content">
              <div className="item-image">
                <img src={item.cover} alt={item.name} />
              </div>
              
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>单价: ￥{item.price}</p>
                
                <div className="quantity-controls">
                  <Button 
                    icon={<AiOutlineMinus />} 
                    onClick={() => handleDecrease(item.id)}
                  />
                  <span className="quantity">{item.quantity}</span>
                  <Button 
                    icon={<AiOutlinePlus />} 
                    onClick={() => handleIncrease(item)}
                  />
                </div>
                
                <p className="item-total">小计: ￥{item.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="order-summary">
        <Card>
          <h3>订单汇总</h3>
          <div className="summary-row">
            <span>商品总数:</span>
            <span>{cartItems.length} 件</span>
          </div>
          <div className="summary-row">
            <span>合计金额:</span>
            <span className="total-amount">￥{totalAmount}</span>
          </div>
          <Button 
            type="primary" 
            size="large" 
            block 
            onClick={handleCheckout}
          >
            提交订单
          </Button>
          
        </Card>
      </div>
    </div>
  )
}

export default Order