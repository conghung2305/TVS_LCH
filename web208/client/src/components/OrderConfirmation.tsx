import React from "react";
import { Container, Typography, Stack, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/'); 
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Xác nhận đơn hàng
      </Typography>
      <Paper sx={{ padding: 2, marginBottom: 4 }}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h6" color="success.main">
            Cảm ơn bạn! Đơn hàng của bạn đã được đặt thành công.
          </Typography>
          <Typography variant="body1">
            Chúng tôi đã gửi xác nhận đơn hàng qua email. Vui lòng kiểm tra email của bạn để biết thêm chi tiết về đơn hàng và thông tin giao hàng.
          </Typography>
          <Button
            variant="contained"
            sx={{ 
              backgroundColor: '#007bff', 
              color: '#ffffff', 
              '&:hover': { 
                backgroundColor: '#0056b3' 
              } 
            }}
            onClick={handleBackToHome}
          >
            Quay lại trang chủ
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default OrderConfirmation;
