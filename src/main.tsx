import React from "react";
import ReactDOM from "react-dom/client";
// import { RouterProvider } from "react-router-dom";

import "./styles/normalize.scss";
import App from "./App";
// import Conversation from "./components/Conversation.tsx";
// import ErrorComponent from "./components/Error.tsx";
// import Login from "./pages/Login.tsx";

// const router = createBrowserRouter([
//   {
//     path: "/messenger",
//     element: <Conversation />,
//     errorElement: <ErrorComponent />,
//   },
//   {
//     path: "/",
//     element: <Login />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App></App>
  </React.StrictMode>
);
