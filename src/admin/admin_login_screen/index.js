import React, { useState } from "react";
import "./AdminLoginScreen.css";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { Navigate, useNavigate } from "react-router-dom";
function AdminLoginScreen() {
  // State để lưu tài khoản, mật khẩu và lỗi
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const signIn = useSignIn(); // Ensure useSignIn is called inside a React Component or hook
  // Hàm handleLogin để xử lý khi người dùng nhấn nút "Đăng nhập"
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://13.215.253.129:3000/v1/auth/login",
        {
          email: account,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const data = res.data;
        if (res.data.status === 200) {
          if (
            signIn({
              auth: {
                token: data.data.accessToken,
                type: "Bearer",
              },
              // refresh: res.data.refreshToken
            })
          ) {
            navigate("/adminhome");
            console.log("login");
          } else {
            alert("Đăng nhập thất bại");
          }
        }
      })
      .catch((error) => {
        alert("Lỗi! Đăng nhập thất bại. Hãy kiểm tra thông tin đăng nhập.");
        console.log("Login error:", error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src="https://via.placeholder.com/500x500"
          alt="App"
          className="login-image"
        />
        <h1 className="app-name">Tên cửa hàng</h1>
        <p className="app-slogan">Slogan cửa hàng</p>
      </div>
      <div className="login-right">
        <h2 className="login-title">Đăng nhập</h2>
        <div className="login-form">
          <div className="form-group">
            <label htmlFor="account">Tài khoản</label>
            <input
              type="text"
              id="account"
              placeholder="account"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="login-button" onClick={(e) => handleLogin(e)}>
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginScreen;
