import React from "react";
import { Form, Input, Button, NavBar, DotLoading } from "antd-mobile";
import { useUserLogin } from "@/store/user";
import { useNavigate } from "react-router-dom";

export default () => {
  const { loginFetch, isloading } = useUserLogin((state) => state);
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    console.log(values);
    loginFetch(values, navigate);
  };

  let initialValues = {
    username: "ikun",
    password: "666666",
  };

  const handleback = () => {};

  return (
    <>
      <NavBar onBack={handleback}>用户登录</NavBar>
      <Form
        layout="horizontal"
        footer={
          <Button
            block
            type="submit"
            color="primary"
            size="large"
            disabled={isloading}
          >
            {isloading ? <DotLoading /> : "提交"}
          </Button>
        }
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item
          name="username"
          label="账号"
          rules={[{ required: true, message: "账号不能为空" }]}
        >
          <Input placeholder="请输入账号" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: "密码不能为空" }]}
        >
          <Input placeholder="请输入密码" />
        </Form.Item>
      </Form>
    </>
  );
};
