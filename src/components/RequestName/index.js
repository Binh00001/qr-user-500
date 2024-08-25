import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./RequestName.scss";
import clearIcon from "../../assets/image/Icon/close grey.png";
import helloText from "../../assets/image/Icon/hello.png";
const cx = classNames.bind(styles);

function RequestName({ callback }) {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const handleClearUserName = () => {
    // Clear the userName from the component state
    setUserName("");
    // Remove the userName from local storage
    localStorage.removeItem("cusName");
  };

  const handleClearPhoneNumber = () => {
    // Clear the phoneNumber from the component state
    setPhoneNumber("");
    setPhoneError("");
    // Remove the phoneNumber from local storage
    localStorage.removeItem("cusPhone");
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^0\d{9}$/; // Regex to check if the number starts with 0 and is followed by 9 digits
    return phoneRegex.test(number);
  };

  useEffect(() => {
    if (userName !== "" && validatePhoneNumber(phoneNumber)) {
      setIsReady(true);
      setPhoneError(""); // Clear error if the phone number is valid
    } else {
      setIsReady(false);
      if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
        setPhoneError("Số điện thoại không hợp lệ. Vui lòng nhập lại.");
      } else {
        setPhoneError("");
      }
    }
  }, [userName, phoneNumber]);

  const handleSubmit = () => {
    // Save the username and phone number to local storage
    if (isReady) {
      localStorage.setItem("cusName", userName);
      localStorage.setItem("cusPhone", phoneNumber);
      if (callback) {
        callback();
      }
    }
  };

  return (
    <div className={cx("request-name-container")}>
      <div className={cx("welcome-icon")}>
        <img src={helloText} alt="Hello"></img>
      </div>
      <div className={cx("welcome-text")}>Chào mừng bạn đến Tên cửa hàng!</div>
      <div className={cx("welcome-subtext")}>
        Mời bạn nhập tên và số điện thoại để nhà hàng phục vụ bạn nhanh chóng
        hơn, chính xác hơn
      </div>
      <div className={cx("input-container")}>
        <input
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            localStorage.setItem("cusName", e.target.value);
          }}
          placeholder="Nhập tên của bạn"
        />
        {userName && (
          <img src={clearIcon} alt="Clear" onClick={handleClearUserName} />
        )}
      </div>
      <div className={cx("input-container")}>
        <input
          value={phoneNumber}
          maxLength={10}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            localStorage.setItem("cusPhone", e.target.value);
          }}
          placeholder="Nhập số điện thoại của bạn"
        />
        {phoneNumber && (
          <img src={clearIcon} alt="Clear" onClick={handleClearPhoneNumber} />
        )}
        {phoneError && <div className={cx("error-text")}>{phoneError}</div>}
      </div>
      <button
        className={cx("start-button")}
        onClick={handleSubmit}
        disabled={!isReady}
      >
        Bắt đầu
      </button>
    </div>
  );
}

export default RequestName;
