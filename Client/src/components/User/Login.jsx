import React, { useState } from "react";
import { Form, Input, Button, Typography, Alert } from "antd";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import "../../index.css";

const { Title, Text } = Typography;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleLogin = async (values) => {
    const { email, password } = values;
    setError("");

    const loginData = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        loginData
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        alert("Login Successfully!");
        window.location.href = "/homepage";
      } else {
        setError("Login failed. Please check your credentials.");
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Password or Email is incorrect.");
      toast.error("Password or Email is incorrect.");
    }
    resetForm();
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
          onFinish={handleLogin}
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="0000" htmlType="submit" className="login-button">
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

      <Toaster position="top-right" />
    </div>
  );
}

export default Login;
