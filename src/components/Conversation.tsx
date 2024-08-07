import { FormEvent, useEffect, useState } from "react";
import io from "socket.io-client";
import "../styles/Conversation.scss";

const socket = io(import.meta.env.VITE_SOCKET_URL);

interface IoData {
  data: string;
  id: string;
}

enum SocketEvent {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  MESSAGE = "message",
}

const yourself = "You";

export default function Conversation() {
  let sessionId: string;
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
    socket.on(SocketEvent.CONNECT, () => {
      console.log("socket.id", socket.id);
      sessionId = socket.id!;
    });
  }, []);

  useEffect(() => {
    socket.on(SocketEvent.MESSAGE, (data: IoData) => {
      if (data.id === sessionId) {
        data.id = yourself;
      }

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
          <div
            key={i}
            className={`${
              message.id === yourself ? "message-box" : "message-box-response"
            }`}
          >
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
