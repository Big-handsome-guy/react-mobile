import { Tag } from "antd-mobile";
import React from "react";
import "./index.css";

type Props = {};

export default function Explore({}: Props) {
  return (
    <div>
      <div className="course_list">
        {[1, 2, 3, 4].map((item) => {
          return (
            <div className="course" key={item}>
              <div className="poster">
                <img
                  src="https://little-potato.twohcar.top/dS8AigRA62pdipjy7QMPP4dxEvEf0clU/image.png"
                  alt=""
                />
                <Tag className="tag" color="rgba(0,0,0,0.4)">
                  免费
                </Tag>
              </div>
              <h3>课程名称</h3>
              <p>基本信息</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
