import React, { useState, useEffect } from "react"
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import { Avatar, List, Space, message, Spin } from 'antd'
import axios from 'axios'


export const HistoryOrder = () => {
  const [historyOrders, setHistoryOrders] = useState([])
  const [loading, setLoading] = useState(true)
  // const [loading, setLoading] = useState(true)

  // 获取历史订单数据
  const fetchHistoryOrder = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://127.0.0.1:4523/m1/6327429-6022799-default/api/historyorder')
      const historyOrderData = response.data
    
      if (historyOrderData.code === 200) {
        // setLoading(false)
        setHistoryOrders(historyOrderData.data)
      } else {
        message.error('获取历史订单失败')
      }
    } catch (error) {
      message.error('获取历史订单失败，请稍后再试')
    } finally {
      //模拟延迟
      setTimeout(() => {
         setLoading(false)
      }, 2000);
     
    }
  }


  useEffect(() => {
    fetchHistoryOrder()
  }, [])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <p>加载历史订单中...</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>历史订单</h2>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page)
          },
          pageSize: 5,
          total: historyOrders.length,
          showSizeChanger: false,
          showQuickJumper: true,
        }}
        dataSource={historyOrders}
        footer={
          <div style={{ textAlign: 'center', color: '#666' }}>
            <b>小本生意</b> 配送不易 🚚
          </div>
        }
        renderItem={order => (
          <List.Item
            key={order.id}
            extra={
              <img
                width={272}
                height={200}
                alt="订单图片"
                src={order.image}
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            }
          >
            <List.Item.Meta
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{order.title}</span>
                </div>
              }
              description={
                <div>
                  <p>订单号：{order.orderNo}</p>
                  <p>下单时间：{order.orderTime}</p>
                  <p>订单金额：<span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>¥{order.totalAmount}</span></p>
                </div>
              }
            />
            
            {/* 订单内容 */}
            <div style={{ marginBottom: '16px' }}>
              <p>{order.content}</p>
            </div>

            {/* 订单商品列表 */}
            {order.items && order.items.length > 0 && (
              <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: '6px' }}>
                <h4>订单详情：</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {order.items.map((item, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      background: 'white', 
                      padding: '8px', 
                      borderRadius: '4px',
                      minWidth: '200px'
                    }}>
                      <img 
                        src={item.image} 
                        alt={item.productName}
                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', marginRight: '8px' }}
                      />
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{item.productName}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          数量：{item.quantity} | 单价：¥{item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </List.Item>
        )}
      />
    </div>
  )
}

export default HistoryOrder