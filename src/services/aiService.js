import axios from 'axios'

// KIMI API 服务
export const kimiService = {
  async getRecommendation(userMessage, products) {
    try {
      const response = await axios.post(
        //模板字符串，用于拼接一个 API 请求的 URL
        `${process.env.REACT_APP_KIMI_BASE_URL}/chat/completions`, // 修改这里
        {
          model: "moonshot-v1-8k",
          messages: [
            {
              role: "system",
              content: `你是一个零食推荐助手。用户会告诉你他们的场景，你需要从以下商品中推荐合适的零食：
              ${JSON.stringify(products.map(p => ({ name: p.name, price: p.price, id: p.id })))}
              
              请用JSON格式回复，包含推荐的商品ID数组和推荐理由：
              {
                "recommendedIds": [1, 2, 3],
                "reason": "推荐理由"
              }`
            },
            {
              role: "user",
              content: userMessage
            }
          ],
          max_tokens: 300,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_KIMI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const aiResponse = response.data.choices[0].message.content
      return JSON.parse(aiResponse)
    } catch (error) {
      console.error('KIMI API 错误:', error)
      throw error
    }
  }
}
