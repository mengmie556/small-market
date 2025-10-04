import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ProductCart } from '../../components/product/ProductCart'
import axios from 'axios'
import './SearchResults.css'

export const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [allProducts, setAllProducts] = useState([])
  const [error, setError] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  // 从URL获取搜索关键词
  const getSearchQuery = () => {
    const params = new URLSearchParams(location.search)
    return params.get('q') || ''
  }

  const searchQuery = getSearchQuery()

  // 获取所有商品数据
  const fetchAllProducts = async () => {
    try {
      setError(null)
      const response = await axios.get('http://127.0.0.1:4523/m1/6327429-6022799-default/api/products')
      if (response.data.code === 200) {
        setAllProducts(response.data.data)
      } else {
        setError('获取商品数据失败')
      }
    } catch (error) {
      console.error('获取商品数据失败:', error)
      setError('网络错误，请稍后重试')
    }
  }

  // 搜索商品
  const searchProducts = (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setLoading(true)
    
    // 模拟搜索延迟，实际项目中可以移除这个延迟
    setTimeout(() => {
      const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(query.toLowerCase())) ||
        (product.desc && product.desc.toLowerCase().includes(query.toLowerCase()))
      )
      
      setSearchResults(filtered)
      setLoading(false)
    }, 300)
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])

  useEffect(() => {
    if (allProducts.length > 0) {
      searchProducts(searchQuery)
    }
  }, [searchQuery, allProducts])

  const handleBackToHome = () => {
    navigate('/')
  }

  // 处理新搜索
  const handleNewSearch = (newQuery) => {
    navigate(`/search?q=${encodeURIComponent(newQuery)}`)
  }

  if (error) {
    return (
      <div className="search-results-container">
        <div className="search-header">
          <button onClick={handleBackToHome} className="back-button">
            ← 返回首页
          </button>
          <h2>搜索出错</h2>
        </div>
        <div className="error-container">
          <p>{error}</p>
          <button onClick={fetchAllProducts} className="retry-button">
            重试
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="search-results-container">
      <div className="search-header">
        <button onClick={handleBackToHome} className="back-button">
          ← 返回首页
        </button>
        <h2>搜索结果</h2>
        {searchQuery && (
          <p className="search-info">
            搜索关键词: "<span className="search-term">{searchQuery}</span>"
            {!loading && (
              <span className="result-count">
                {searchResults.length > 0 
                  ? ` - 找到 ${searchResults.length} 个相关商品`
                  : ' - 暂无相关商品'
                }
              </span>
            )}
          </p>
        )}
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>搜索中...</p>
        </div>
      ) : (
        <>
          {searchResults.length > 0 ? (
            <div className="search-results-grid">
              {searchResults.map(product => (
                <ProductCart
                  key={product.id}
                  id={product.id}
                  cover={product.cover}
                  name={product.name}
                  price={product.price}
                />
              ))}
            </div>
          ) : searchQuery ? (
            <div className="no-results">
              <h3>没有找到相关商品</h3>
              <p>试试搜索其他关键词</p>
              <div className="search-suggestions">
                <h4>热门搜索：</h4>
                <div className="suggestion-tags">
                  {['薯片', '可乐', '巧克力', '方便面', '饼干'].map(tag => (
                    <button 
                      key={tag}
                      className="suggestion-tag"
                      onClick={() => handleNewSearch(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="search-prompt">
              <p>请输入搜索关键词</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}