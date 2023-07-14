import { useState } from "react";
import { Form, Input, Button, message, Space } from "antd";
import axios from "axios";
import PropTypes from "prop-types";

const LoginForm = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: "http://172.16.0.239:3000/authenticate",
        data: {
          username: values.userName,
          password: values.password,
        },
      });
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      onLogin(token);
    } catch (error) {
      message.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const styleFrom = {
    width: 500,
    border: "1px solid #ccc",
    padding: 20,
    backgroundColor: "#ccc",
    borderRadius: 20,
  };

  const styleSpace = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9naW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60')",
  };
  return (
    <Space style={styleSpace}>
      <Form onFinish={handleFormSubmit} style={styleFrom}>
        <Form.Item
          label="User Name"
          name="userName"
          rules={[{ required: true, message: "Please enter your user name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password." }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func,
};

export default LoginForm;
