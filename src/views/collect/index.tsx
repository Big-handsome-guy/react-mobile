import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useUserLogin } from "@/store/user";
import { userCollectGet } from "@/api/user";
import Course from "@/components/course";

type Props = {};

export default function Collect({}: Props) {
  const { userInfo } = useUserLogin((state) => state);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (userInfo) {
      let userid = userInfo.objectId;
      userCollectGet({ userid }).then((res) => {
        setList(res.data.results);
      });
    }
  }, []);
  return (
    <div>
      <Navbar title="我的喜欢" />
      <Course courseList={list} />
    </div>
  );
}
