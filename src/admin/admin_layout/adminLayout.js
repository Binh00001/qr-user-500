import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTableManagementOpen, setIsTableManagementOpen] = useState(false);
  const [isProductManagementOpen, setIsProductManagementOpen] = useState(false);
  const [isOrderManagementOpen, setIsOrderManagementOpen] = useState(false);
  const [isFeedbackAndStatsOpen, setIsFeedbackAndStatsOpen] = useState(false);
  const [isRequestManagementOpen, setRequestManagementOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // Preserve menu state based on the path
    const path = location.pathname;
    if (path.includes("/adminhome/table")) {
      setIsTableManagementOpen(true);
    } else if (
      path.includes("/adminhome/category") ||
      path.includes("/product-options") ||
      path.includes("/create-product") ||
      path.includes("/all-products")
    ) {
      setIsProductManagementOpen(true);
    } else if (path.includes("/all-orders")) {
      setIsOrderManagementOpen(true);
    } else if (
      path.includes("/revenue-stats") ||
      path.includes("/product-stats") ||
      path.includes("/customer-stats")
    ) {
      setIsFeedbackAndStatsOpen(true);
    } else if (path === "/adminhome") {
      setRequestManagementOpen(true);
    }

    // Optional: Close other menus when one is open to avoid multiple menus open simultaneously
    return () => {
      setIsTableManagementOpen(false);
      setIsProductManagementOpen(false);
      setIsOrderManagementOpen(false);
      setIsFeedbackAndStatsOpen(false);
      setRequestManagementOpen(false);
    };
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleRequestManagement = () => {
    setRequestManagementOpen(!isRequestManagementOpen);
  };

  const toggleProductManagement = () => {
    setIsProductManagementOpen(!isProductManagementOpen);
  };

  const toggleOrderManagement = () => {
    setIsOrderManagementOpen(!isOrderManagementOpen);
  };

  const toggleFeedbackAndStats = () => {
    setIsFeedbackAndStatsOpen(!isFeedbackAndStatsOpen);
  };

  const toggleTableManagement = () => {
    setIsTableManagementOpen(!isTableManagementOpen);
  };

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-account-info">
          <div className="admin-account-details">
            <p className="admin-name">John Doe</p>
            <p className="admin-role">Administrator</p>
          </div>
          <img
            src="https://via.placeholder.com/40"
            alt="Avatar"
            className="admin-avatar"
          />
        </div>
      </header>
      <div className="admin-body">
        <nav className={`admin-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <ul>
            {/* Quản lý yêu cầu */}
            <li
              className="sidebar-section-title"
              onClick={toggleRequestManagement}
            >
              <span>Quản lý yêu cầu</span>
            </li>
            {isRequestManagementOpen && (
              <ul className="sidebar-submenu">
                <li>
                  <a href="/adminhome">Gọi nhân viên</a>
                </li>
              </ul>
            )}

            {/* Quản lý bàn */}
            <li
              className="sidebar-section-title"
              onClick={toggleTableManagement}
            >
              <span>Quản lý bàn</span>
            </li>
            {isTableManagementOpen && (
              <ul className="sidebar-submenu">
                <li>
                  <a href="/adminhome/table">Danh sách bàn</a>
                </li>
              </ul>
            )}

            {/* Quản lý sản phẩm */}
            <li
              className="sidebar-section-title"
              onClick={toggleProductManagement}
            >
              <span>Quản lý sản phẩm</span>
            </li>
            {isProductManagementOpen && (
              <ul className="sidebar-submenu">
                <li>
                  <a href="/adminhome/category">Danh mục</a>
                </li>
                <li>
                  <a href="/adminhome/option">Tuỳ chọn</a>
                </li>
                <li>
                  <a href="/create-product">Tạo sản phẩm</a>
                </li>
                <li>
                  <a href="/all-products">Toàn bộ sản phẩm</a>
                </li>
              </ul>
            )}

            {/* Quản lý đơn hàng */}
            <li
              className="sidebar-section-title"
              onClick={toggleOrderManagement}
            >
              <span>Quản lý đơn hàng</span>
            </li>
            {isOrderManagementOpen && (
              <ul className="sidebar-submenu">
                <li>
                  <a href="/adminhome/order">Toàn bộ đơn hàng</a>
                </li>
              </ul>
            )}

            {/* Phản hồi và thống kê */}
            <li
              className="sidebar-section-title"
              onClick={toggleFeedbackAndStats}
            >
              <span>Phản hồi và thống kê</span>
            </li>
            {isFeedbackAndStatsOpen && (
              <ul className="sidebar-submenu">
                <li>
                  <a href="/revenue-stats">Doanh thu</a>
                </li>
                <li>
                  <a href="/product-stats">Sản phẩm</a>
                </li>
                <li>
                  <a href="/customer-stats">Khách hàng</a>
                </li>
              </ul>
            )}
          </ul>
        </nav>

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
