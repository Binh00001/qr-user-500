import React, { useState, useEffect } from "react";
import className from "classnames";
import styles from "./DetailProduct.scss";
import returnIcon from "../../assets/image/Icon/close.png";
import noteIcon from "../../assets/image/Icon/notes.png";
import minusIcon from "../../assets/image/Icon/minus.png";
import plusIcon from "../../assets/image/Icon/plus.png";
const cx = className.bind(styles);

function DetailProduct({
  product,
  textConfirm,
  closeFunction,
  confirmFunction,
}) {
  console.log(product);
  const [quantity, setQuantity] = useState(1); // Biến trạng thái để giữ số lượng
  const [note, setNote] = useState(""); // Biến trạng thái để giữ ghi chú

  // Hàm tăng số lượng sản phẩm
  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Hàm giảm số lượng sản phẩm
  const decrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  return (
    <div className={cx("detail-product-container")}>
      <div className={cx("image-container")}>
        <img src={product.image} alt="PRODUCT-IMAGE" />
      </div>
      <div className={cx("return-button-container")} onClick={closeFunction}>
        <img src={returnIcon} alt="RETURN"></img>
      </div>
      <div className={cx("detail-container")}>
        <div className={cx("detail-name")}>{product.name}</div>
        <div className={cx("detail-description")}>{product.description}</div>
      </div>
      <div className={cx("option-container")}>
        <div className={cx("note-container")}>
          <img src={noteIcon} alt="NOTE"></img>
          <textarea
            placeholder="Ghi chú cho món ăn"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
        <div className={cx("bottom-bar")}>
          <div className={cx("action-with-product")}>
            <div className={cx("minus-container")} onClick={decrementQuantity}>
              <img src={minusIcon} alt="MINUS"></img>
            </div>
            <div className={cx("input-quantity")}>
              <input
                type="tel"
                maxLength={4}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
              />
            </div>
            <div className={cx("plus-container")} onClick={incrementQuantity}>
              <img src={plusIcon} alt="PLUS"></img>
            </div>
          </div>
          <div
            className={cx("add-to-cart-button")}
            onClick={() => confirmFunction(product, quantity, note)}
          >
            <div className={cx("add-to-cart-title")}>
              {textConfirm} ({quantity})
            </div>
            <div className={cx("add-to-cart-price")}>
              {(product.price * quantity).toLocaleString("vi-VN")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
