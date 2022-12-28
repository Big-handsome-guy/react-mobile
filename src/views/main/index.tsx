import React from "react";
import Footerbar from "@/components/FooterBar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserLogin } from "@/store/user";

type Props = {};

export default function index({}: Props) {
  let { pathname } = useLocation();
  let { userInfo } = useUserLogin((state) => state);
  const guard = () => {
    if (userInfo || pathname.indexOf("mine") == -1) {
      return <Outlet />;
    } else {
      return <Navigate to="/login" />;
    }
  };
  return (
    <div>
      {guard()}
      <Footerbar />
    </div>
  );
}
