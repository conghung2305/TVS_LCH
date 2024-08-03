import React from "react";
import { Button, Container, Stack, Typography, Link, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { InputText } from "src/components/elements/InputText";
import { MIN_PASSWORD } from "src/consts";
import isEmail from "validator/lib/isEmail";
import { useNavigate } from "react-router-dom";

type LoginFormParams = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<"success" | "error">("success");

  const validate = (values: LoginFormParams) => {
    const { email, password } = values;
    const errors: ValidationErrors = {};
    if (!email) errors.email = "Cần nhập email vào";
    if (email && !isEmail(email)) errors.email = "Chưa đúng định dạng email";
    if (!password) errors.password = "Cần nhập mật khẩu vào";
    if (password && password.length < MIN_PASSWORD)
      errors.password = `Cần nhập mật khẩu tối thiểu ${MIN_PASSWORD} ký tự`;
    return errors;
  };

  const onSubmit = async (values: LoginFormParams) => {
    try {
      const { data } = await axios.post("/auth/login", values);
      localStorage.setItem("authToken", data.token); 
      localStorage.setItem("user", JSON.stringify(data.user));
      setSnackbarMessage("Đăng nhập thành công!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error during login:", error);
      setSnackbarMessage("Đã xảy ra lỗi khi đăng nhập.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
      <Typography variant="h4" textAlign="center" mb={3} fontWeight="bold" color="#1976d2">
        Đăng nhập
      </Typography>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Stack gap={2}>
              <Field
                name="email"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label="Email"
                    messageError={meta.touched && meta.error}
                  />
                )}
              />
              <Field
                name="password"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label="Mật khẩu"
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
                Đăng nhập
              </Button>
              <Typography textAlign="center" mt={2}>
                Chưa có tài khoản?{" "}
                <Link
                  href="/register"
                  sx={{ color: "#1976d2", fontWeight: "bold", "&:hover": { color: "#155a8a" } }}
                >
                  Đăng ký ngay
                </Link>
              </Typography>
            </Stack>
          </form>
        )}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
