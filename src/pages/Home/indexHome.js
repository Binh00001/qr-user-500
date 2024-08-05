import React, { useState, useEffect } from "react";
import styles from "./home.scss";
import { useParams, useNavigate } from "react-router-dom";
import classNames from "classnames";
import axios from "axios";
import { Fragment } from "react";
import RequestName from "../../components/RequestName";
import InteractionItem from "../../components/InteractionItem/index";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import banner1 from "../../assets/image/banner1.png";
import banner2 from "../../assets/image/banner2.png";
import banner3 from "../../assets/image/banner3.png";
import billing from "../../assets/image/Icon/billing.png";
import comment from "../../assets/image/Icon/comment.png";
import person from "../../assets/image/Icon/user.png";
import food from "../../assets/image/Icon/fast-food.png";
import location from "../../assets/image/Icon/maps-and-flags.png";
const cx = classNames.bind(styles);
function HomePage() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [showRequestName, setShowRequestName] = useState(false);
  const options = {
    delay: 2000,
    // jump: true,
  };

  useEffect(() => {
    const storedName = localStorage.getItem("cusName");
    if (!storedName) {
      setShowRequestName(true);
    }
  }, []);

  const handleNameSubmitted = (name) => {
    console.log("Name submitted:", name);
    // Additional actions after name submission, like navigating to another page
    setShowRequestName(false);
  };

  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay(options)]);
  return (
    <div className={cx("page_home_restaurant")}>
      {showRequestName && <RequestName callback={handleNameSubmitted} />}
      <div className={cx("page--content")}>
        <Fragment>
          <div className={cx("restaurant-info-container")}>
            <div className={cx("name")}>Tên Nhà Hàng</div>
            <div className={cx("address")}>
              <img src={location} alt="ICON" />
              Địa chỉ nhà hàng ở 123 123 123
            </div>
          </div>
          <div className={cx("banner-container")}>
            <div className="embla" ref={emblaRef}>
              <div className="embla__container">
                <div className="embla__slide">
                  <img src={banner1} alt="Banner 1" />
                </div>
                <div className="embla__slide">
                  <img src={banner2} alt="Banner 2" />
                </div>
                <div className="embla__slide">
                  <img src={banner3} alt="Banner 3" />
                </div>
              </div>
            </div>
          </div>
          <div className={cx("flag-1-1")}>
            <div className={cx("user-info")}>
              <div className={cx("hello")}>Chào buổi chiều </div>
              <div className={cx("name")}>Tên Khách Hàng</div>
            </div>
            <div className={cx("table-info")}>
              <div className={cx("text")}>
                Chúng tôi sẽ trả đồ cho bạn tại bàn:{" "}
              </div>
              <div className={cx("table")}>{}2B</div>
            </div>
          </div>
          <div className={cx("interaction--container")}>
            <InteractionItem
              iconName={billing}
              description="Gọi thanh toán"
              backgroundColor="#FFB72B"
            />
            <InteractionItem
              iconName={person}
              description="Gọi nhân viên"
              backgroundColor="#92B4EC"
            />
            <InteractionItem
              iconName={comment}
              description="Đánh giá"
              backgroundColor="#AACB73"
            />
          </div>
          <div
            className={cx("menu-navigate-button")}
            onClick={() => navigate("/menu")}
          >
            <div className={cx("image-icon")}>
              <img src={food} alt="ICON" />
            </div>
            <div className={cx("text-description-menu")}>
              Xem Menu - Gọi món
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
}

export default HomePage;
