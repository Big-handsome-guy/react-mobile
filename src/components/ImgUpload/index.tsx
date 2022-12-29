import { Avatar, ImageUploader, Toast } from "antd-mobile";
import React, { useEffect, useState } from "react";
import "./index.scss";
import Cloud from "leancloud-storage";
import { userUpdate } from "@/api/user";
import { useUserLogin } from "@/store/user";

type Props = {};
//1.将本地资源对象转变为base64编码
const getBase64 = (img: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve(reader.result as string);
    });
    reader.readAsDataURL(img);
  });
};

export default function ImgUpload({}: Props) {
  const { userInfo, userUpdateFetch } = useUserLogin((state) => state);
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    if (userInfo && userInfo.avatar) {
      setAvatar(userInfo.avatar);
    }
  }, []);

  const handleUpload: any = async (file: File) => {
    // console.log(file);
    //2.获取文件资源的base64编码
    let base64 = await getBase64(file);
    //3.构建leancloud资源
    let res: any = await new Cloud.File("mobile.png", { base64 }).save();
    let { url } = res.attributes;
    // console.log("图片路径", url);
    setAvatar(url); //4.设置头像预览
    let { objectId, sessionToken } = userInfo!;
    userUpdate(objectId, sessionToken, { avatar: url }).then((res) => [
      (userInfo!.avatar = url), //替换状态机中的头像
      userUpdateFetch(userInfo!),
      Toast.show({
        icon: "success",
        content: "操作成功",
      }),
    ]);
    return {
      url,
    };
  };
  return (
    <div>
      <ImageUploader upload={handleUpload}>
        <Avatar className="avatar" src={avatar} />
      </ImageUploader>
    </div>
  );
}
