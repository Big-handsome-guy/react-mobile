import React, { useEffect, useState } from "react";
import { TabBar } from "antd-mobile";
import "./index.css";
import explore from "../../assets/icon/tab_explore_normal.png";
import exploreActive from "../../assets/icon/tab_explore_selected.png";
import today from "../../assets/icon/tab_today_normal.png";
import todayActive from "../../assets/icon/tab_today_selected.png";
import mine from "../../assets/icon/tab_mine_normal.png";
import mineActive from "../../assets/icon/tab_mine_selected.png";
import { useNavigate, useLocation } from "react-router-dom";

export default () => {
  const tabs = [
    {
      key: "/",
      title: "今日",
      icon: (active: boolean) => {
        return (
          <img src={active ? todayActive : today} alt="" className="tab_icon" />
        );
      },
    },
    {
      key: "/explore",
      title: "探索",
      icon: (active: boolean) => {
        return (
          <img
            src={active ? exploreActive : explore}
            alt=""
            className="tab_icon"
          />
        );
      },
    },
    {
      key: "/mine",
      title: "我的",
      icon: (active: boolean) => {
        return (
          <img src={active ? mineActive : mine} alt="" className="tab_icon" />
        );
      },
    },
  ];

  const [activeKey, setActiveKey] = useState("/today");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    setActiveKey(pathname);
  }, []);
  const handleChange = (key: string) => {
    // console.log(key);
    navigate(key);
    setActiveKey(key);
  };

  return (
    <TabBar className="footerbar" onChange={handleChange} activeKey={activeKey}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};
