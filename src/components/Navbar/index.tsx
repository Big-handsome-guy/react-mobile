import React from "react";
import { NavBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
};
export default function Navbar({ title }: Props) {
  const navigate = useNavigate();
  const back = () => navigate(-1);

  return (
    <div>
      <NavBar onBack={back}>{title}</NavBar>
    </div>
  );
}
