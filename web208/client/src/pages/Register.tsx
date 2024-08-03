import React from 'react';
import { Button, Container, Stack, Typography, Link } from "@mui/material";
import axios from "axios";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { InputText } from "src/components/elements/InputText";
import { MIN_PASSWORD } from "src/consts";
import isEmail from "validator/lib/isEmail";

type RegisterFormParams = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const nav = useNavigate();
  const [success, setSuccess] = React.useState(false); 

  const validate = (values: RegisterFormParams) => {
    const { username, email, password, confirmPassword } = values;
    const errors: ValidationErrors = {};

    if (!username) errors.username = "Cần nhập username vào";
    if (!email) errors.email = "Cần nhập email vào";
    if (email && !isEmail(email)) errors.email = "Chưa đúng định dạng email";
    if (!password) errors.password = "Cần nhập password vào";
    if (password && password.length < MIN_PASSWORD)
      errors.password = `Cần nhập password tối thiểu ${MIN_PASSWORD} ký tự`;
    if (confirmPassword !== password)
      errors.confirmPassword = "Password và Confirm Password không khớp";

    return errors;
  };

  const onSubmit = async (data: RegisterFormParams) => {
    try {
      await axios.post("/auth/register", data);
      setSuccess(true); 
      setTimeout(() => nav("/login"), 3000); 
    } catch (error: any) {
      console.error("Registration error:", error.response?.data || error.message);
      alert("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 8,
        p: 4,
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" textAlign={"center"} mb={3} fontWeight="bold" color="#1976d2">
        Đăng ký
      </Typography>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Stack gap={2}>
              <Field
                name="username"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label={"Tên người dùng"}
                    messageError={meta.touched && meta.error}
                  />
                )}
              />
              <Field
                name="email"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label={"Email"}
                    messageError={meta.touched && meta.error}
                  />
                )}
              />
              <Field
                name="password"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label={"Mật khẩu"}
                    messageError={meta.touched && meta.error}
                    type="password"
                  />
                )}
              />
              <Field
                name="confirmPassword"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label={"Xác nhận mật khẩu"}
                    messageError={meta.touched && meta.error}
                    type="password"
                  />
                )}
              />
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  py: 1.5,
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#155a8a",
                  },
                }}
              >
                Submit
              </Button>
              {success && (
                <Typography color="success.main" textAlign={"center"} mt={2}>
                  Đăng ký thành công! Bạn sẽ được chuyển hướng đến trang đăng nhập.
                </Typography>
              )}
              <Typography textAlign={"center"} mt={2}>
                Đã có tài khoản? <Link href="/login" sx={{ color: "#1976d2", fontWeight: "bold", "&:hover": { color: "#155a8a" } }}>Đăng nhập ngay</Link>
              </Typography>
            </Stack>
          </form>
        )}
      />
    </Container>
  );
};

export default Register;
