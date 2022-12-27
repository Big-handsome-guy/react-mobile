import React from "react";
import { useCounter } from "@/store/count";
import { useBanner } from "@/store/banner";
import { Button } from "antd-mobile";

type Props = {};

export default function compA({}: Props) {
  const counter = useCounter((state) => state);
  const { banner, addBanner } = useBanner((state) => state);
  return (
    <div className="box">
      compA,{counter.count}
      <Button color="primary" onClick={counter.increment}>
        数字++
      </Button>
      {banner.map((item, index) => {
        return (
          <div key={index}>
            <img src={item.img} alt="" style={{ height: "50px" }} />
          </div>
        );
      })}
      <Button
        color="primary"
        onClick={() => {
          addBanner({
            img: "https://little-potato.twohcar.top/D2blPuYt0QFLHFbpBOaGm9Ud6dwiVpnl/image.png",
            name: "新数据包",
          });
        }}
      >
        新增banner数据
      </Button>
    </div>
  );
}
