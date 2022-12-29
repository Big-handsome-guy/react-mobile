import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { initRem } from "./utils/rem";
import { HashRouter } from "react-router-dom";
import AV from "leancloud-storage";
import { ID, KEY, BASE } from "@/config/index";

initRem(); //初始化rem布局配置

//初始化leacnCloud的SDK
AV.init({
  appId: ID,
  appKey: KEY,
  serverURL: BASE,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
