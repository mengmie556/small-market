import React from "react"
import "./login.css"
import back from "../../assets/images/my-account.jpg"
import { useDispatch } from "react-redux"
import { authActions } from "../../store/authSlice"
//登陆界面
export const Login = () => {
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(authActions.login())
  }
  return (
    <>
      <section className='login'>
        <div className='container'>
          <div className='backImg'>
            <img src={back} alt='' />
            <div className='text'>
              <h3>Login</h3>
              <h1>My ACcount</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <span>账号</span>
            <input type='text' required placeholder="请输入用户名/邮箱"/>
            <span>密码*</span>
            <input type='password' required placeholder="请输入密码"/>
            <button className='button'>登陆</button>
          </form>
        </div>
      </section>
    </>
  )
}
