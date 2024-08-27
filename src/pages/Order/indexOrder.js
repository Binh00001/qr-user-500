import classNames from "classnames";
import axios from "axios";
import styles from "./order.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import leftArrow from "../../assets/image/Icon/left-arrow.png";
import close from "../../assets/image/Icon/close grey.png";
import DetailProduct from "../../components/DetailProduct/index";
const cx = classNames.bind(styles);

function Order() {
  const navigate = useNavigate();
  // Khởi tạo các biến dùng cho detail product
  const [showDetailProduct, setShowDetailProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [options, setOptions] = useState([]);
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

  //fetch option list
  useEffect(() => {
    console.log(selectedProduct);

    // Fetch options whenever the selected category changes
    if (selectedProduct == null) {
      return;
    }
    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/v1/option?category_id=${selectedProduct.category_id}`
        );
        if (response.data.status === 200) {
          setOptions(response.data.data);
          // setOptions(response.data.options); // Assuming the response has an options array
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchOptions();
  }, [selectedProduct]);

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

  const handleCloseDetail = () => {
    setShowDetailProduct(false);
    setSelectedProduct(null);
  };

  const handleOpenDetail = (product, e) => {
    e.stopPropagation(); // Ngăn sự kiện nổi bọt
    setSelectedProduct(product);
    setShowDetailProduct(true);
  };

  const handleActionClick = (e) => {
    e.stopPropagation(); // Ngăn sự kiện nổi bọt để không kích hoạt hàm handleOpenDetail khi nhấn vào các nút trong 'action-with-item-in-cart'
  };

  function addToCartLocalWithNote(product, quantity, note, selectedOption) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex((x) => x.id === product.id);

    if (existingItemIndex !== -1) {
      // If the product with the same option is already in the cart, update its information
      cart[existingItemIndex].cartQuantity = quantity;
      cart[existingItemIndex].note = note;
      cart[existingItemIndex].option_id = selectedOption.id;
      cart[existingItemIndex].option_name = selectedOption.name;
      cart[existingItemIndex].option_price = selectedOption.price;
    }

    // Save the updated cart back to Local Storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Call any functions to close details or refresh the cart display as needed
    handleCloseDetail();
    setReloadCart((prev) => !prev); // Assuming state to re-render is managed elsewhere
  }

  return (
    <div className={cx("page-order-restaurant")}>
      {showDetailProduct && (
        <Fragment>
          <div
            className={cx("overlay")}
            onClick={() => handleCloseDetail()}
          ></div>
          <DetailProduct
            product={selectedProduct}
            textConfirm={"Cập nhật"}
            closeFunction={handleCloseDetail}
            confirmFunction={addToCartLocalWithNote}
            currentNote={selectedProduct.note}
            currentQuantity={selectedProduct.cartQuantity}
            options={options}
          ></DetailProduct>
        </Fragment>
      )}
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
              <div className="option-name">{item.option_name}</div>
              <div className={cx("price")}>
                {(
                  item.cartQuantity *
                  (item.option_price + item.price)
                ).toLocaleString("vi-VN", {
                  currency: "VND",
                })}
              </div>
            </div>
          </div>

          <div className={cx("trail-container")}>
            <div className={cx("delete-div")} onClick={() => removeItem(index)}>
              <img src={close} alt="x"></img>
            </div>
            <div
              className={cx("edit-text")}
              onClick={(e) => handleOpenDetail(item, e)}
            >
              Chỉnh sửa
            </div>
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
