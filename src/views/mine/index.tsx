import { Button, List, Image } from "antd-mobile";
import React from "react";
import { useUserLogin } from "@/store/user";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import likes from "@/assets/icon/ic_mine_likes.png";
import theme from "@/assets/icon/ic_mine_theme_select.png";
import history from "@/assets/icon/ic_mine_history.png";
import setting from "@/assets/icon/ic_mine_system_setting.png";
import ImgUpload from "@/components/ImgUpload";

type Props = {};

export default function Mine({}: Props) {
  const { logOutFetch } = useUserLogin((state) => state);
  const navigate = useNavigate();
  const listArr = [
    {
      title: "我的喜欢",
      icon: likes,
    },
    {
      title: "最近播放",
      icon: history,
    },
    {
      title: "我的主题",
      icon: theme,
    },
    {
      title: "系统设置",
      icon: setting,
    },
  ];
  return (
    <div className="mine">
      <div className="user">
        {/* <Avatar className="avatar" src="" /> */}
        <ImgUpload />
        <div>
          <h1>加入NiceDay</h1>
          <p>点击头像换图</p>
        </div>
      </div>
      <div className="list_box">
        <List>
          {listArr.map((item, index) => {
            return (
              <List.Item
                key={index}
                prefix={
                  <Image
                    src={item.icon}
                    style={{ borderRadius: 20 }}
                    fit="cover"
                    width={20}
                    height={20}
                  />
                }
                onClick={() => {
                  navigate("/mine/collect");
                }}
              >
                {item.title}
              </List.Item>
            );
          })}
        </List>
      </div>
      <div className="list_box">
        <List>
          {listArr.map((item) => {
            return (
              <List.Item
                prefix={
                  <Image
                    src={item.icon}
                    style={{ borderRadius: 20 }}
                    fit="cover"
                    width={20}
                    height={20}
                  />
                }
                onClick={() => {}}
              >
                {item.title}
              </List.Item>
            );
          })}
        </List>
        <Button className="logout" block color="danger" onClick={logOutFetch}>
          退出登录
        </Button>
      </div>
    </div>
  );
}
