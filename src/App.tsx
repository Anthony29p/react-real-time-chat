import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Conversation from "./components/Conversation";
import ErrorComponent from "./components/Error";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/messenger",
    element: <Conversation />,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorComponent />,
  },
]);

export default function App() {
  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}
