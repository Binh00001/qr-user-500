import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./chatbotPage.scss";
import classNames from "classnames";
import leftArrow from "../../assets/image/Icon/left-arrow.png";
const cx = classNames.bind(styles);

const ChatBotPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      const newUserMessage = { text: input, from: "user" };
      setMessages([...messages, newUserMessage]);
      setInput("");

      // Simulate a server/bot response
      setTimeout(() => {
        const botResponse = { text: `Echo: ${input}`, from: "bot" };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000); // Delay the response to simulate network latency
    }
  };

  return (
    <div className={cx("chatbot-page")}>
      <div className={cx("header")}>
        <button onClick={() => navigate(-1)} className={cx("back-button")}>
          <img src={leftArrow} alt="back" />
        </button>
        <h1 className={cx("title")}>Chat bot</h1>
      </div>
      <div className={cx("chat-container")}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={cx("message", { "from-user": message.from === "user" })}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div></div>
      <div className={cx("input-container")}>
        <input
          type="text"
          placeholder="Hãy nhắn gì đó..."
          className={cx("chat-input")}
          value={input}
          onChange={handleInputChange}
        />
        <button className={cx("send-button")} onClick={handleSendMessage}>
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatBotPage;
