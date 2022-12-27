import React from "react";
import CompA from "./compA";
import CompB from "./compB";
import "./index.scss";

type Props = {};

export default function index({}: Props) {
  return (
    <div>
      <CompA />
      <CompB />
    </div>
  );
}
