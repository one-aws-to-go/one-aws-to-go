//import "./Typography.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import Test from "./Test";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Test />,
    errorElement: <div>Error page</div>,
  },
  {
    path: "main",
    element: <App />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
