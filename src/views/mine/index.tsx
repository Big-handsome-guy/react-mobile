import { Button } from "antd-mobile";
import React from "react";
import { useUserLogin } from "@/store/user";

type Props = {};

export default function Mine({}: Props) {
  const { logOutFetch } = useUserLogin((state) => state);
  return (
    <div>
      <Button color="danger" onClick={logOutFetch}>
        退出登录
      </Button>
    </div>
  );
}
