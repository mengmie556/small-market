import React from "react"
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { cartActions } from "../../store/cartSlice"
//购物车商品项组件
//商品图片（cover）
//商品名称（name）
//单价（price）
//数量（quantity）
//总价（totalPrice）
export const CartItems = ({ id, cover, name, price, quantity, totalPrice }) => {
  const dispatch = useDispatch()
//增加商品数量
  const incCartitems = () => {
    dispatch(cartActions.addToCart({ id, name, price }))
  }
  //减少商品数量
  const descCartitems = () => {
    dispatch(cartActions.removeFromCart(id))
  }
  return (
    <>
      <div className='cardList' key={id}>
        <div className='cartContent'>
          <div className='img'>
            <img src={cover} alt='' />
            {/* 删除按钮 */}
            <button className='remove flexCenter'>
              <AiOutlineClose />
            </button>
          </div>
          <div className='details'>
            <p>{name}</p>
            <label htmlFor=''>单价 ￥{price}</label>

            <div className='price'>
              <div className='qty flexCenter'>
                <button className='plus' onClick={incCartitems}>
                  <AiOutlinePlus />
                </button>
                <button className='num'>{quantity}</button>
                <button className='minus' onClick={descCartitems}>
                  <AiOutlineMinus />
                </button>
              </div>
              <div className='priceTitle' style={{paddingLeft: '120px'}}>￥{totalPrice.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
