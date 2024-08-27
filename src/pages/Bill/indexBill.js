import classNames from "classnames";
import axios from "axios";
import styles from "./bill.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import leftArrow from "../../assets/image/Icon/left-arrow.png";
import close from "../../assets/image/Icon/close grey.png";
import DetailProduct from "../../components/DetailProduct/index";
const cx = classNames.bind(styles);

function Bill() {
  const navigate = useNavigate();
  return (
    <div className={cx("page-bill-restaurant")}>
      <div className={cx("bill-top-bar")}>
        <div
          className={cx("bill-return")}
          onClick={() => navigate("/home/token")}
        >
          <img src={leftArrow} alt="Back"></img>
        </div>
        <div className={cx("bill-title")}>Lịch sử đơn hàng</div>
        <div></div>
      </div>
      <div className={cx("bill-header-area")}></div>
      <div className={cx("bill-footer-area")}></div>
    </div>
  );
}

export default Bill;
