import io from "socket.io-client";
import { FormEvent, useEffect, useState } from "react";
import "./styles/Conversation.css";

const socket = io(import.meta.env.VITE_SOCKET_URL);

interface IoData {
  data: string;
  id: string;
}

enum SocketEvent {
  MESSAGE = "message",
}

export default function Conversation() {
  const [currentValue, setCurrentValue] = useState<string>("");
  const [messages, setMessages] = useState<IoData[]>([]);

  const receiveMessage = (message: IoData): void =>
    setMessages((state) => [...state, message]);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    socket.emit(SocketEvent.MESSAGE, currentValue);
    setCurrentValue("");
  };

  useEffect(() => {
    socket.on(SocketEvent.MESSAGE, (data: IoData) => {
      receiveMessage(data);
    });

    return () => {
      socket.off(SocketEvent.MESSAGE);
    };
  }, []);

  return (
    <div className="container">
      <div className="message-box-container">
        {messages.map((message, i) => (
          <div key={i} className="message-box">
            <span>{message.id} :</span>
            <span>{message.data}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Write your message"
          onChange={(e) => setCurrentValue(e.target.value)}
          value={currentValue}
          className="input"
        />
        <button className="button">Send</button>
      </form>
    </div>
  );
}
