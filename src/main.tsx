import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { initRem } from "./utils/rem";
import { HashRouter } from "react-router-dom";

initRem(); //初始化rem布局配置
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
