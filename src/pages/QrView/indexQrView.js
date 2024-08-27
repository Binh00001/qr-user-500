import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./QrView.scss"; // Ensure this file exists and is correctly referenced
import leftArrow from "../../assets/image/Icon/left-arrow.png"; // Update path as necessary

const cx = classNames.bind(styles);

function QrView() {
  const navigate = useNavigate();
  const location = useLocation(); // To access passed state
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    console.log(location.state);

    // Get qrUrl from location state
    if (location.state && location.state.qrUrl) {
      setQrUrl(location.state.qrUrl);
    }
  }, [location.state]);

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
        {qrUrl && (
          <img src={qrUrl} alt="QR Code" className={cx("qr-code-image")} />
        )}
      </div>
      <div className={cx("qr-view-footer")}></div>
    </div>
  );
}

export default QrView;
