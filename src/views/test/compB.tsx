import React from "react";
import { useCounter } from "@/store/count";
import { Button } from "antd-mobile";
import { useBanner } from "@/store/banner";

type Props = {};

export default function compB({}: Props) {
  let { count, decrement } = useCounter((state) => state);
  let { fetchBanner } = useBanner((state) => state);
  return (
    <div className="box">
      compB,{count}
      <Button color="warning" onClick={decrement}>
        数字--
      </Button>
      <Button color="warning" onClick={fetchBanner}>
        获取banner数据
      </Button>
      <Button
        color="danger"
        onClick={() => {
          useBanner.persist.clearStorage();
        }}
      >
        清除本地存储
      </Button>
    </div>
  );
}
