import "./AdminLoginScreen.css";
function AdminLoginScreen() {
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
            <input type="text" id="account" placeholder="account" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input type="password" id="password" placeholder="password" />
          </div>
          <button className="login-button">Đăng nhập</button>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginScreen;
