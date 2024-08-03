import React, { useState, useEffect } from "react";
import { Container, Stack, Typography, TextField, Button, Paper, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, Alert } from "@mui/material";
import { useCart } from "src/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
type Province = "Hà Nội" | "Hồ Chí Minh" | "Đà Nẵng"; // Thêm các tỉnh khác nếu cần
type City = string; // Thành phố có thể là bất kỳ chuỗi nào
const provincesAndCities: Record<Province, City[]> = {
  "Hà Nội": ["Hoàn Kiếm", "Tây Hồ", "Cầu Giấy"],
  "Hồ Chí Minh": ["Quận 1", "Quận 3", "Thủ Đức"],
  "Đà Nẵng": ["Hải Châu", "Sơn Trà", "Ngũ Hành Sơn"],
  // Thêm các tỉnh và thành phố khác nếu cần
};
const Checkout = () => {
  const { state } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    province: "" as Province,
    city: "",
    phone: "",
    paymentMethod: "COD" as "COD" | "Bank Transfer",
  });
  const [cities, setCities] = useState<City[]>([]);
  const [showQRCode, setShowQRCode] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    if (form.province) {
      setCities(provincesAndCities[form.province] || []);
    } else {
      setCities([]);
    }
  }, [form.province]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleProvinceChange = (event: SelectChangeEvent<Province>) => {
    setForm({ ...form, province: event.target.value as Province });
  };
  const handleCityChange = (event: SelectChangeEvent<City>) => {
    setForm({ ...form, city: event.target.value });
  };
  const handlePaymentMethodChange = (event: SelectChangeEvent<"COD" | "Bank Transfer">) => {
    setForm({ ...form, paymentMethod: event.target.value as "COD" | "Bank Transfer" });
    setShowQRCode(event.target.value === "Bank Transfer");
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Kiểm tra tính hợp lệ của số điện thoại
    const phoneRegex = /^[0-9]{10,15}$/; // Ví dụ regex cho số điện thoại
    if (!phoneRegex.test(form.phone)) {
      alert('Số điện thoại không hợp lệ.');
      return;
    }
    
    // Gửi dữ liệu thanh toán đến API hoặc xử lý thanh toán tại đây
    console.log("Form submitted:", form);
    setSuccessMessage("Thanh toán thành công!");
    // Ví dụ: Điều hướng đến trang xác nhận đơn hàng
    navigate('/order-confirmation');
  };

  const calculateTotalPrice = () => {
    return state.items.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return total + price * quantity;
    }, 0);
  };

  return (
    <Container>
      <Header/>
      <Typography variant="h4" gutterBottom>
        Thanh toán
      </Typography>
      <Paper sx={{ padding: 2, marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Thông tin giao hàng
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Họ và tên"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="province-label">Tỉnh</InputLabel>
              <Select
                labelId="province-label"
                name="province"
                value={form.province}
                onChange={handleProvinceChange}
                required
              >
                {Object.keys(provincesAndCities).map((province) => (
                  <MenuItem key={province} value={province}>
                    {province}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="city-label">Thành phố</InputLabel>
              <Select
                labelId="city-label"
                name="city"
                value={form.city}
                onChange={handleCityChange}
                required
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Số điện thoại"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              type="tel"
              inputProps={{ pattern: '[0-9]{10,15}' }}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="payment-method-label">Phương thức thanh toán</InputLabel>
              <Select
                labelId="payment-method-label"
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handlePaymentMethodChange}
                required
              >
                <MenuItem value="COD">Thanh toán khi nhận hàng</MenuItem>
                <MenuItem value="Bank Transfer">Chuyển khoản ngân hàng</MenuItem>
              </Select>
            </FormControl>
            {showQRCode && (
              <Stack spacing={2} alignItems="center">
                <Typography variant="h6">Quét mã QR để thanh toán</Typography>
                <img src="https://media-cdn-v2.laodong.vn/storage/newsportal/2021/6/15/920631/4128Nh_2021-06-15_Lu.jpeg" width={300} height={300} alt="QR Code" />
                <Typography variant="body2">Quét mã QR để thanh toán</Typography>
              </Stack>
            )}
            {successMessage && (
              <Alert severity="success">{successMessage}</Alert>
            )}
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h6" fontWeight={500}>
                Tổng tiền: {calculateTotalPrice()} VND
              </Typography>
              <Button type="submit" variant="contained" color="success">
                Xác nhận đơn hàng
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
      <Footer/>
    </Container>
  );
};
export default Checkout;
