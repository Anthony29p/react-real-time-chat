import io from "socket.io-client";
import { FormEvent, useEffect, useState } from "react";

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
    socket.on(SocketEvent.MESSAGE, receiveMessage);

    return () => {
      socket.off(SocketEvent.MESSAGE);
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write your message"
          onChange={(e) => setCurrentValue(e.target.value)}
          value={currentValue}
        />
        <button>Send</button>
      </form>
      <div>
        {messages.map((message, i) => (
          <li key={i}>
            {message.id}: {message.data}
          </li>
        ))}
      </div>
    </div>
  );
}
