import { usePlayerStore } from "@/store/player";
import { FloatingBubble } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
import React from "react";
import "./index.scss";

type Props = {};

export default function Bubble({}: Props) {
  const { isPlay, changePlay, popData, changeBubbleShow } = usePlayerStore(
    (state) => state
  );
  return (
    <div>
      <FloatingBubble
        style={{
          "--initial-position-bottom": "24px",
          "--initial-position-right": "24px",
          "--edge-distance": "24px",
        }}
      >
        <div className={`bubble_box ${isPlay ? "play" : ""}`}>
          <i
            className="iconfont icon-zanting2"
            onClick={() => {
              changePlay(false);
            }}
          ></i>
          <i
            className="iconfont icon-icon-bofang"
            onClick={() => {
              changePlay(true);
            }}
          ></i>
          <img
            className={`poster ${isPlay ? "" : "pause"}`}
            src={popData?.img}
          />
          <CloseOutline
            fontSize={18}
            onClick={() => {
              changeBubbleShow(false);
              changePlay(false);
            }}
          />
        </div>
      </FloatingBubble>
    </div>
  );
}
