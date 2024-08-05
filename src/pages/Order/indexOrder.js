import classNames from "classnames";
import axios from "axios";
import styles from "./order.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import leftArrow from "../../assets/image/Icon/left-arrow.png";
import close from "../../assets/image/Icon/close grey.png";
const cx = classNames.bind(styles);

function Order() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
    // Tính tổng giá tiền
    const total = items.reduce(
      (sum, item) => sum + item.price * item.cartQuantity,
      0
    );
    setTotalPrice(total);
  }, [reloadCart]);

  const removeItem = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setReloadCart(!reloadCart);
  };

  const clearCart = () => {
    setCartItems([]); // Cập nhật state để rỗng
    setTotalPrice(0); // Đặt tổng tiền về 0
    localStorage.setItem("cart", JSON.stringify([])); // Cập nhật Local Storage
  };

  return (
    <div className={cx("page-order-restaurant")}>
      <div className={cx("order-top-bar")}>
        <div className={cx("order-return")} onClick={() => navigate("/menu")}>
          <img src={leftArrow} alt="Back"></img>
        </div>
        <div className={cx("order-title")}>Các món đang chọn</div>
        <div className={cx("order-clear")} onClick={() => clearCart()}>
          Xoá giỏ
        </div>
      </div>
      <div className={cx("order-header-area")}></div>
      {cartItems.map((item, index) => (
        <div key={index} className={cx("item-container")}>
          <div className={cx("lead-container")}>
            <img src={item.image} alt="Ảnh"></img>
            <div className={cx("detail-container")}>
              <div className={cx("quantity-and-name")}>
                <div className={cx("quantity")}>{`${item.cartQuantity} x`}</div>
                <div className={cx("name")}>{item.name}</div>
              </div>
              <div className={cx("price")}>
                {(item.price * item.cartQuantity).toLocaleString("vi-VN", {
                  currency: "VND",
                })}
              </div>
            </div>
          </div>

          <div className={cx("trail-container")}>
            <div className={cx("delete-div")} onClick={() => removeItem(index)}>
              <img src={close} alt="x"></img>
            </div>
            <div className={cx("edit-text")}>Chỉnh sửa</div>
          </div>
        </div>
      ))}
      {totalPrice !== 0 && (
        <div className={cx("bill-price-container")}>
          <div className={cx("bill-text")}>Tổng tiền:</div>
          <div className={cx("bill-total-price")}>
            {totalPrice.toLocaleString("vi-VN", {
              currency: "VND",
            })}
          </div>
        </div>
      )}
      {totalPrice === 0 && (
        <div className={cx("order-is-empty-container")}>Giỏ hàng trống</div>
      )}

      <div className={cx("order-footer-area")}></div>
      <div className={cx("confirm-container")}>
        <div className={cx("confirm-button")}>Gửi yêu cầu gọi món</div>
      </div>
    </div>
  );
}

export default Order;
