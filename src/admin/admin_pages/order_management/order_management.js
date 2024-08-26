import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "./OrderManagement.css";
import AdminLayout from "../../admin_layout/adminLayout";

const OrderManagement = () => {
  const [startDate, setStartDate] = useState(
    moment().subtract(7, "days").toDate()
  );
  const [endDate, setEndDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchPhoneNumber, setSearchPhoneNumber] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);
  useEffect(() => {
    fetchOrders();
  }, [startDate, endDate, currentPage]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${
          process.env.REACT_APP_API_URL
        }/v1/order/all?page=${currentPage}&pageSize=${ordersPerPage}&startDate=${moment(
          startDate
        ).format("YYYY-MM-DD")}&endDate=${moment(endDate).format("YYYY-MM-DD")}`
      );
      if (response.data.status === 200) {
        setOrders(response.data.listOrder.currentPage || []);
      } else {
        setOrders([]);
      }
    } catch (error) {
      setError("Failed to fetch orders. Please try again later.");
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadDetail = async (orderId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/v1/order/detail?id=${orderId}`
      );
      console.log(response.data);
      if (response.data.status === 200) {
        setOrderDetail(response.data.Order);
        setIsDialogOpen(true);
      } else {
        setOrderDetail(null);
        alert("Failed to load order details.");
      }
    } catch (error) {
      setError("Failed to fetch order details. Please try again later.");
      console.error("Error fetching order details:", error);
    } finally {
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const updateOrderStatus = async (orderId, status) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/v1/order/${orderId}/status`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Order status updated successfully.");
        fetchOrders(); // Refresh orders after updating status
      } else {
        alert("Failed to update order status.");
      }
    } catch (error) {
      setError("Failed to update order status. Please try again later.");
      console.error("Error updating order status:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderActionButtons = (order) => {
    switch (order.status) {
      case "pending":
        return (
          <>
            <button
              className="confirm-button"
              onClick={() => updateOrderStatus(order.id, "preparing")}
            >
              Xác Nhận
            </button>
            <button
              className="cancel-button"
              onClick={() => updateOrderStatus(order.id, "canceled")}
            >
              Huỷ Bỏ
            </button>
          </>
        );
      case "preparing":
        return (
          <>
            <button
              className="complete-button"
              onClick={() => updateOrderStatus(order.id, "completed")}
            >
              Hoàn Thành
            </button>
            <button
              className="cancel-button"
              onClick={() => updateOrderStatus(order.id, "canceled")}
            >
              Huỷ Bỏ
            </button>
          </>
        );
      case "completed":
        return <span className="status-completed">Đã Hoàn Thành </span>;
      case "canceled":
        return <span className="status-canceled">Đã Huỷ</span>;
      default:
        return null;
    }
  };

  // Filter orders by phone number
  const filteredOrders = orders.filter((order) =>
    order.phone_number.includes(searchPhoneNumber)
  );

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <AdminLayout>
      {isDialogOpen && orderDetail && (
        <div className="dialog-overlay">
          <div className="dialog-container">
            <button
              className="close-button"
              onClick={() => setIsDialogOpen(false)}
            >
              ×
            </button>
            <div className="dialog-content">
              <h2>Chi tiết đơn hàng</h2>
              <table className="detail-table">
                <thead>
                  <tr>
                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetail.dishes.map((dish) => (
                    <tr key={dish.id}>
                      <td>{dish.name}</td>
                      <td>{formatCurrency(dish.price)}</td>
                      <td>{dish.orderdishes.quantity}</td>
                      <td>
                        {formatCurrency(dish.price * dish.orderdishes.quantity)}
                      </td>
                      <td>{dish.orderdishes.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <div className="order-management-container">
        <div className="order-management-header">
          <h1 className="order-management-title">Danh sách hoá đơn</h1>
          <div className="order-filter">
            <span>Hoá đơn từ ngày: </span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
            />
            <span> đến ngày: </span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
            />
            <input
              type="text"
              placeholder="Tìm kiếm theo số điện thoại"
              value={searchPhoneNumber}
              onChange={(e) => setSearchPhoneNumber(e.target.value)}
              className="phone-search-input"
            />
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Số thứ tự</th>
                  <th>Số bàn</th>
                  <th>Tổng tiền</th>
                  <th>Số điện thoại</th>
                  <th>Trạng thái hiện tại</th>
                  <th>Thao tác</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{indexOfFirstOrder + index + 1}</td>
                    <td>{order.table_id}</td>
                    <td className="order-total">
                      {formatCurrency(order.total_price)}
                    </td>
                    <td>{order.phone_number}</td>
                    <td>{order.status}</td>
                    <td>{renderActionButtons(order)}</td>
                    <td>
                      <button
                        className="detail-button"
                        onClick={() => loadDetail(order.id)}
                      >
                        Xem Chi Tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`pagination-button ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default OrderManagement;
