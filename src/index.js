import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // ✅ 여기에서만 BrowserRouter 사용!

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    {" "}
    {/* ✅ 여기에서만 감싸야 합니다 */}
    <App />
  </BrowserRouter>
);
