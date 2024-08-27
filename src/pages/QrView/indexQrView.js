import React from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./QrView.scss"; // Ensure this file exists and is correctly referenced
import leftArrow from "../../assets/image/Icon/left-arrow.png"; // Update path as necessary

const cx = classNames.bind(styles);

function QrView({ src }) {
  const navigate = useNavigate();

  return (
    <div className={cx("qr-view-container")}>
      <div className={cx("qr-view-header")}>
        <div
          className={cx("qr-view-back-button")}
          onClick={() => navigate("/bill")}
        >
          <img src={leftArrow} alt="Back" />
        </div>
        <div className={cx("qr-view-title")}>Mã thanh toán của bạn</div>
        <div></div>
      </div>
      <div className={cx("qr-view-content")}>
        {/* Centered and responsive image */}
        {src && <img src={src} alt="QR Code" className={cx("qr-code-image")} />}
      </div>
      <div className={cx("qr-view-footer")}></div>
    </div>
  );
}

export default QrView;
