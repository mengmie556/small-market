import React, { useState, useEffect } from "react";
import Medicine from "../../assets/images/Medicine.svg";
import "./header.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Card } from "./Card";
import { User } from "./User";
import { Link, useNavigate, useLocation } from "react-router-dom";

//头部导航栏
export const Header = ({onSearch}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      header.classList.toggle("active", window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 处理搜索提交
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // 如果当前在首页，直接调用过滤函数
    if (location.pathname === "/" && onSearch) {
      onSearch(value);
    }
  };

    const handleSearch = (e) => {
    e.preventDefault()
    // 只进行搜索过滤，不跳转页面
    if (onSearch) {
      onSearch(searchQuery)
    }
  }

    // 处理搜索提交
  // const handleSearch = (e) => {
  //   e.preventDefault()
  //   if (searchQuery.trim()) {
  //     // 如果不在首页，跳转到搜索结果页
  //     if (location.pathname !== '/') {
  //       navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
  //     } else if (onSearch) {
  //       // 在首页则直接过滤
  //       onSearch(searchQuery.trim())
  //     }
  //   }
  // }
  
  // 处理回车键搜索
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
      console.log("Enter key pressed, searching for:", searchQuery);
    }
  };

  return (
    <>
      <header className="header">
        <div className="scontainer flex">
          <div className="logo">
            <Link to="/">
              <img src={Medicine} alt="Medicine" />
            </Link>
          </div>
          <div className="search flex">
            <input
              type="text"
              placeholder="搜索商品..."
              value={searchQuery}

              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="account flexCenter">
            <Card />
            <User />
          </div>
        </div>
      </header>
    </>
  );
};

