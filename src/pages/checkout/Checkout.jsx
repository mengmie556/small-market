import React, { useState, useEffect } from "react";
import { QRCode, message, Spin } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // 添加这行
import { useSelector, useDispatch } from "react-redux"
import { cartActions } from "../../store/cartSlice"



export const Checkout = () => {
  const dispatch = useDispatch();
  // const cartActions = useSelector((state) => state.cart.itemsList)
  const navigate = useNavigate(); // 添加这行
  const [isScanned, setIsScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState("pending"); // pending, success, expired

  // 模拟轮询检查支付状态
  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {;

        // 模拟API响应
        const mockApiCall = () => {
          setLoading(true);
          setTimeout(() => {
            setIsScanned(true);
            setOrderStatus("success");
            message.success("支付成功！");
            setLoading(false);
            dispatch(cartActions.clearCart());
            // 添加延迟跳转，让用户看到成功提示
            navigate("/"); // 跳转到支付成功页面
            
          }, 10000);
        };

        mockApiCall();
      } catch (error) {
        message.error("检查支付状态时出错");
        setLoading(false);
      }
    };

    // 创建轮询间隔
    const interval = setInterval(checkPaymentStatus, 5000);

    // 清理函数
    return () => clearInterval(interval);
  }, [navigate,dispatch, cartActions]);

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative" }}>
        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.8)",
              marginBottom: "300px",
            }}
          >
            <Spin size="large" />
          </div>
        )}

        <QRCode
          errorLevel="H"
          value="https://ant.design/"
          icon="./assets/images/emu_icon"
          status={isScanned ? "expired" : "active"}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        {orderStatus === "pending" && <p>等待扫码支付...</p>}
        {orderStatus === "success" && (
          <div style={{ color: "#52c41a" }}>
            <CheckCircleFilled style={{ fontSize: "24px" }} />
            <p>支付成功</p>
          </div>
        )}
        {orderStatus === "expired" && <p>二维码已过期，请刷新页面重试</p>}
      </div>
    </div>
  );
};

export default Checkout;
