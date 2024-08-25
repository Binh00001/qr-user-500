import styles from "./feedback.scss";
import closeIcon from "../../assets/image/Icon/close-black.png";
import starIcon from "../../assets/image/Icon/star-default.png";
import coloredStarIcon from "../../assets/image/Icon/star-colored.png";
import noteIcon from "../../assets/image/Icon/notes.png";
import phoneIcon from "../../assets/image/Icon/telephone.png";
import { useState } from "react";
import classNames from "classnames";
const cx = classNames.bind(styles);

function FeedbackDialog({ callback }) {
  const [score, setScore] = useState(1); // Default score is 1
  const maxScore = 5;

  const feedbackOptions = [
    { text: "Rất thất vọng", value: "Bạn có gì chưa hài lòng phải không?" },
    { text: "Thất vọng", value: "Bạn có gì chưa hài lòng phải không?" },
    { text: "Bình thường", value: "Bạn có gì chưa hài lòng phải không?" },
    { text: "Hài lòng", value: "Bạn có gì chưa hài lòng phải không?" },
    {
      text: "Vô cùng hài lòng",
      value: "Bạn có thể chia sẻ điều khiến bạn hài lòng không?",
    },
  ];

  const handleStarClick = (index) => {
    setScore(index + 1);
  };

  const handleClose = () => {
    if (typeof callback === "function") {
      callback();
    }
  };
  return (
    <div className={cx("feedback-container")}>
      <div className={cx("fb-close-container")}>
        <img src={closeIcon} alt="CLOSE" onClick={handleClose} />
      </div>
      <div className={cx("fb-title")}>Trải nghiệm của bạn hôm nay thế nào?</div>
      <div className={cx("fb-star-container")}>
        {Array.from({ length: maxScore }).map((_, index) => (
          <img
            key={index}
            src={index < score ? coloredStarIcon : starIcon}
            alt="STAR"
            onClick={() => handleStarClick(index)}
            className={cx("star")}
          />
        ))}
      </div>
      <div className={cx("star-title")}>{feedbackOptions[score - 1].text}</div>
      <div className={cx("virtual-hr")}></div>
      <div className={cx("question-text")}>
        {feedbackOptions[score - 1].value}
      </div>

      <div className={cx("icon-and-input-note")}>
        <img src={noteIcon} alt="NOTE" />
        <input placeholder="Hãy chia sẻ trải nghiệm của bạn?" />
      </div>
      <div className={cx("virtual-hr")}></div>
      <div className={cx("ask-for-phone")}>
        Nhà hàng rất trân trọng và mong muốn phản hồi lại đánh giá trên, bạn vui
        lòng để lại số điện thoại nhé :
      </div>
      <div className={cx("fb-bottom-container")}>
        <div className={cx("phone-input-container")}>
          <img src={phoneIcon} alt="PHONE"></img>
          <input type="tel" placeholder="Số điện thoại" />
        </div>
        <button className={cx("submit-button")}>Gửi đánh giá</button>
      </div>
    </div>
  );
}

export default FeedbackDialog;
