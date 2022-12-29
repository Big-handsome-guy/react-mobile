import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserLogin } from "@/store/user";

type IGuardProps = {
  children: ReactNode;
};

export default function Guard(Props: IGuardProps) {
  let { pathname } = useLocation();
  let { userInfo } = useUserLogin((state) => state);
  const guard = () => {
    if (userInfo || pathname.indexOf("mine") == -1) {
      return Props.children;
    } else {
      return <Navigate to="/login" />;
    }
  };
  return <div>{guard()}</div>;
}
