import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./product.css";
import { ProductCart } from "./ProductCart";
import { AIAssistant } from "../ai/AIAssistant"

//商城物品列表组件
export const Product = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:4523/m1/6327429-6022799-default/api/products"
      );
      const productsData = response.data;
      if (productsData.code === 200) {
        console.log(productsData.data);
        setProducts(productsData.data);
        setFilteredProducts(productsData.data); // 初始显示所有商品
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // 根据搜索关键词过滤商品
// 根据搜索关键词过滤商品
const filterProducts = (query) => {
  if (!query || query.trim() === '') {
    setFilteredProducts(products);
    return;
  }
  const filtered = products.filter(product => {
    const nameMatch = product.name && product.name.toLowerCase().includes(query.toLowerCase());
    return nameMatch;
  });
  
  console.log('过滤后的商品:', filtered);
  setFilteredProducts(filtered);
};

  useEffect(() => {
    fetchProducts();
  }, []);

  // 当搜索关键词变化时，重新过滤商品
  useEffect(() => {
    setFilteredProducts(products); // 重置为所有商品
    filterProducts(searchQuery);
  }, [searchQuery, products]);
  return (
    <>
      <section className="product">
        <div className="container">
          {/* 搜索结果提示 */}
          {searchQuery && (
            <div style={{ marginBottom: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '5px' }}>
              <p>
                搜索 "<span style={{ color: '#007bff', fontWeight: 'bold' }}>{searchQuery}</span>" 
                的结果：找到 {filteredProducts.length} 个相关商品
              </p>
            </div>
          )}

          {/* 商品列表 */}
          {filteredProducts.length > 0 ? (
            <div className="grid3">
              {filteredProducts.map((item) => (
                <ProductCart
                  key={item.id}
                  id={item.id}
                  cover={item.cover}
                  name={item.name}
                  price={item.price}
                />
              ))}
            </div>
          ) : !searchQuery ? (
            // 无搜索结果时的提示
            <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
              {/* <button onClick={test}>ddd</button> */}
              <p>试试搜索其他关键词</p>
            </div>
          ) : (
            // 显示所有商品
            <div className="grid3">
              {filteredProducts.map((item) => (
                <ProductCart
                  key={item.id}
                  id={item.id}
                  cover={item.cover}
                  name={item.name}
                  price={item.price}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 添加AI助手 */}
      <AIAssistant products={filteredProducts} />
    </>
  );
};