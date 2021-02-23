import React, { useEffect, useState } from "react";
import "./chat.style.css";
import axios from "axios";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8000";

const Chat = () => {

  const [message, setMessage] = useState(
    localStorage.getItem("messages") ? localStorage.getItem("messages") : null
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("message", (data) => {
      setMessage(localStorage.getItem("messages"));
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput("");
    const data = {};
    data.message = e.target.elements[0].value;
    const messages = localStorage.getItem("messages")
      ? localStorage.getItem("messages") + data.message + "-"
      : data.message + "-";
    localStorage.setItem("messages", messages);
    axios.post("http://localhost:8000/message", data);
  };

  return (
    <div className="page">
      <div className="chatBox">
        <div className="messages">
          {message
            ? message.split("-").map((message) => (
                <div>
                  <label key={Math.random()}>{message}</label>
                </div>
              ))
            : ""}

        </div>
        <div className="message-input-field">
          <form onSubmit={handleSubmit}>
            <label>
              message:
              <input
                type="text"
                name="name"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
