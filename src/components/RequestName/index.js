import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./RequestName.scss";
import clearIcon from "../../assets/image/Icon/close grey.png";
import helloText from "../../assets/image/Icon/hello.png";
const cx = classNames.bind(styles);

function RequestName({ callback }) {
  const [userName, setUserName] = useState("");
  const [isReady, setIsReady] = useState(false);

  const handleClear = () => {
    // Clear the userName from the component state
    setUserName("");

    // Remove the userName from local storage
    localStorage.removeItem("cusName");
  };

  useEffect(() => {
    if (userName !== "") {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [userName]);

  const handleSubmit = () => {
    // Save the username to local storage
    if (isReady) {
      localStorage.setItem("cusName", userName);
      if (callback) {
        callback(userName);
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
        Mời bạn nhập tên để nhà hàng phục vụ bạn nhanh chóng hơn, chính xác hơn
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
        {isReady && <img src={clearIcon} alt="Clear" onClick={handleClear} />}
      </div>
      <button
        className={cx("start-button")}
        onClick={() => {
          handleSubmit();
        }}
      >
        Bắt đầu
      </button>
    </div>
  );
}

export default RequestName;
