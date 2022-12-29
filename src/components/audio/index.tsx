import React, { useState } from "react";
import "./index.scss";
import { Tag, Popup } from "antd-mobile";
import { DownOutline } from "antd-mobile-icons";
import { usePlayerStore } from "@/store/player";
// import { usePlayerStore } from "@/store/player";
type Props = {};

export default function AudioPlay({}: Props) {
  const { popShow, updatePopShow } = usePlayerStore((state) => state);
  return (
    <Popup
      visible={popShow}
      onMaskClick={() => {
        updatePopShow(false);
      }}
      bodyStyle={{ height: "100vh" }}
    >
      <div className="audio-play">
        <div className="drop-cont">
          <DownOutline
            fontSize={20}
            onClick={() => {
              updatePopShow(false);
            }}
          />
          <Tag color="default">耀眼的播放器</Tag>
          <span></span>
        </div>
        <div className="play-btn stop">
          <i className="iconfont bofang_bg"></i>
          <i className="iconfont zanting1_bg"></i>
          <i className="iconfont zanting_bg"></i>
        </div>
        <div className="audio-control">
          <audio src="https://file2204.h5project.cn/Fexvm9Jd4mL3u0ekcncD5BrRLz32wam4/5c89e8089afc150810.mp3"></audio>
          <div className="icon-cont">
            <i className="iconfont jushoucang"></i>
            <i className="iconfont fenxiang"></i>
          </div>
          <div className="bar">
            <div className="inner">
              <div className="dot"></div>
            </div>
          </div>
        </div>
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
      </div>
    </Popup>
  );
}
