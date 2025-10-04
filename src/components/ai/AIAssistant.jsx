import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../store/cartSlice'
import { message } from 'antd'
import { AiOutlineRobot, AiOutlineSend, AiOutlineClose } from 'react-icons/ai'
import { kimiService } from '../../services/aiService'
import './AIAssistant.css'

export const AIAssistant = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [conversation, setConversation] = useState([])
  const [loading, setLoading] = useState(false)
  
  const dispatch = useDispatch()
  const findProductsByIds = (ids) => {
    return products.filter(product => ids.includes(product.id))
  }

  // AI响应处理
  const handleAIResponse = async (userMessage) => {
    setLoading(true)
    
    try {
      let recommendedProducts = []
      let aiReason = ''

      // 检查是否有足够的商品数据
      if (!products || products.length === 0) {
        throw new Error('商品数据未加载')
      }

      try {
        // console.log('调用KIMI API...')
        const aiResponse = await kimiService.getRecommendation(userMessage, products)
        // console.log('KIMI响应:', aiResponse)
        
        if (aiResponse.recommendedIds && Array.isArray(aiResponse.recommendedIds)) {
          recommendedProducts = findProductsByIds(aiResponse.recommendedIds)
          aiReason = aiResponse.reason || '根据您的需求为您推荐'
        } else {
          throw new Error('AI响应格式不正确')
        }
      } catch (apiError) {
        message.warning('KIMI API暂时不可用')
      }

      if (recommendedProducts.length > 0) {
        let responseText = `${aiReason}\n\n`
        recommendedProducts.forEach((product, index) => {
          responseText += `${index + 1}. ${product.name} - $${product.price}\n`
        })
        responseText += `\n要不要把这些美味的零食加到购物车？ 🛒`
        
        return {
          text: responseText,
          products: recommendedProducts,
          hasRecommendations: true
        }
      } else {
        return {
          text: '抱歉，目前没有找到合适的零食推荐 😅\n',
          products: [],
          hasRecommendations: false
        }
      }
    } catch (error) {
      console.error('AI响应处理错误:', error)
      return {
        text: '哎呀，AI助手暂时卡住了 🤖 请稍后再试试~',
        products: [],
        hasRecommendations: false
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!userInput.trim()) return
    
    const userMessage = userInput.trim()
    setUserInput('')
    
    setConversation(prev => [...prev, { type: 'user', content: userMessage }])
    
    const aiResponse = await handleAIResponse(userMessage)
    
    setConversation(prev => [...prev, { 
      type: 'ai', 
      content: aiResponse.text,
      products: aiResponse.products,
      hasRecommendations: aiResponse.hasRecommendations
    }])
  }

  const handleAddToCart = (product) => {
    dispatch(cartActions.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      cover: product.cover
    }))
    message.success(`${product.name} 已添加到购物车 🛒`)
  }

  const handleAddAllToCart = (products) => {
    products.forEach(product => {
      dispatch(cartActions.addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        cover: product.cover
      }))
    })
    message.success(`已将 ${products.length} 样零食添加到购物车 🎉`)
  }

  return (
    <>
      <div className={`ai-assistant-fab ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <AiOutlineRobot />
      </div>

      {isOpen && (
        <div className="ai-assistant-modal">
          <div className="ai-assistant-header">
            <h3> 零食推荐助手</h3>
            <button onClick={() => setIsOpen(false)}>
              <AiOutlineClose />
            </button>
          </div>

          <div className="ai-assistant-conversation">
            {conversation.length === 0 && (
              <div className="ai-welcome">
                <p>嗨！我是零食推荐助手 </p>
                <p>告诉我您现在的场景，我来为您推荐最合适的零食：</p>
                {/* <ul>
                  <li>"我要看电影了" 🎬</li>
                  <li>"准备熬夜加班" 💻</li>
                  <li>"和朋友聚会" 🎉</li>
                  <li>"打游戏需要零食" 🎮</li>
                  <li>"肚子饿了" 😋</li>
                  <li>"嘴馋想吃点什么" 🤤</li>
                </ul> */}
              </div>
            )}

            {conversation.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <div className="message-content">
                  <p style={{ whiteSpace: 'pre-line' }}>{msg.content}</p>
                  
                  {msg.hasRecommendations && msg.products && (
                    <div className="recommended-products">
                      {msg.products.map(product => (
                        <div key={product.id} className="recommended-product">
                          <img src={product.cover} alt={product.name} />
                          <div className="product-info">
                            <p>{product.name}</p>
                            <span>${product.price}</span>
                          </div>
                          <button onClick={() => handleAddToCart(product)}>
                            加购物车
                          </button>
                        </div>
                      ))}
                      <button 
                        className="add-all-btn"
                        onClick={() => handleAddAllToCart(msg.products)}
                      >
                         全部加入购物车
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="message ai">
                <div className="message-content">
                  <p>正在智能分析您的需求... 🤔</p>
                </div>
              </div>
            )}
          </div>

          <div className="ai-assistant-input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="说说您现在的场景吧..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage} disabled={loading}>
              <AiOutlineSend />
            </button>
          </div>
        </div>
      )}
    </>
  )
}