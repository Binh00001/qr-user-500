import React, { useState } from "react";
import "./AdminLoginScreen.css";

function AdminLoginScreen() {
  // State để lưu tài khoản, mật khẩu và lỗi
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hàm handleLogin để xử lý khi người dùng nhấn nút "Đăng nhập"
  const handleLogin = () => {
    if (account === "" || password === "") {
      setError("Vui lòng nhập đầy đủ tài khoản và mật khẩu.");
    } else {
      setError("");
      // Xử lý đăng nhập ở đây, ví dụ: gửi thông tin lên server
      console.log("Đăng nhập với tài khoản:", account);
      console.log("Mật khẩu:", password);
    }
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
          <button className="login-button" onClick={handleLogin}>
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginScreen;
