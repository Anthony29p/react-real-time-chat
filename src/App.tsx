import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Conversation from "./components/Conversation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/messenger" element={<Conversation />} />
      </Routes>
    </BrowserRouter>
  );
}
