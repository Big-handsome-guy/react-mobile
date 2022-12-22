import React from "react";
import { NavBar, Space, Toast } from "antd-mobile";
import { SearchOutline, MoreOutline } from "antd-mobile-icons";

export default () => {
  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ "--gap": "16px" }}>
        <SearchOutline />
        <MoreOutline />
      </Space>
    </div>
  );

  const back = () =>
    Toast.show({
      content: "点击了返回区域",
      duration: 1000,
    });

  return (
    <div>
      <NavBar onBack={back}>标题</NavBar>
    </div>
  );
};
