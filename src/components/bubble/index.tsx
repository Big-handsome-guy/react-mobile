import { FloatingBubble } from "antd-mobile";
import { MessageFill } from "antd-mobile-icons";
import React from "react";
import "./index.scss";

type Props = {};

export default function Bubble({}: Props) {
  const handleClick = () => [];
  return (
    <div>
      <FloatingBubble
        style={{
          "--initial-position-bottom": "24px",
          "--initial-position-right": "24px",
          "--edge-distance": "24px",
        }}
        onClick={handleClick}
      >
        <MessageFill fontSize={32} />
      </FloatingBubble>
    </div>
  );
}
