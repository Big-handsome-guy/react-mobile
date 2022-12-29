import React from "react";
import Footerbar from "@/components/FooterBar";
import { Outlet } from "react-router-dom";

type Props = {};

export default function Main({}: Props) {
  return (
    <div>
      <Outlet />
      <Footerbar />
    </div>
  );
}
