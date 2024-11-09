import React, { useState } from "react";
import { Form, Input, Button, Typography, Alert } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import "../../index.css";

const { Title, Text } = Typography;

function Login() {
  const [error, setError] = useState(false);

  const onFinish = (values) => {
    const { email, password } = values;
    if (email !== "john@gmail.com" || password !== "password") {
      setError(true);
    } else {
      setError(false);
      alert("Logged in successfully!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Title level={3} className="login-title">
          Login
        </Title>

        {error && (
          <Alert
            message="Your password or username is incorrect"
            type="error"
            showIcon
            className="login-error-message"
          />
        )}

        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            style={{ marginTop: "20px" }}
            label="Email address"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              placeholder="Enter your Email address"
              className="login-input"
            />
          </Form.Item>

          <Form.Item
            style={{ marginTop: "-10px" }}
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter correct password!" },
            ]}
          >
            <Input.Password
              placeholder="Enter your Password"
              className="login-input"
            />
          </Form.Item>

          <Form.Item>
            <Button type="0000" className="login-button">
              SIGN IN
            </Button>
          </Form.Item>
        </Form>

        <div className="login-signup-text">
          <Text>Don't have an account? </Text>
          <a href="/register" className="login-signup-link">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
