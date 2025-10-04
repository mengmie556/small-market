import React from "react"
import image from "../../assets/images/input.png"
import "./account.css"
//账户信息组件
export const Account = () => {
  return (
    <>
      <section className='accountInfo'>
        <div className='container boxItems'>
          <h1>账户信息</h1>
          <div className='content'>
            <div className='left'>
              <div className='img flexCenter'>
                <input type='file' accept='image/*' src={image} alt='imgs' />
                <img src={image} alt='' className='image-preview' />
              </div>
            </div>
            <div className='right'>
              <label>用户名</label>
              <input type='text' required />
              <label>邮箱</label>
              <input type='text' required />
              <label>密码 * </label>
              <input type='text' required />
              <button className='button'>更新</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
