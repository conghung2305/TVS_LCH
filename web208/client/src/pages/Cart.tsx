import { Container, Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from "@mui/material";
import Banner from "src/components/Banner";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "src/contexts/CartContext";
import { useNavigate } from "react-router-dom"; // Sử dụng useNavigate

const labels = ["Ảnh sản phẩm", "Tên sản phẩm", "Giá", "Số lượng", "Tổng tiền", "Thao tác"];

function Cart() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleRemoveFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  // Tính tổng giá trị giỏ hàng
  const calculateTotalPrice = () => {
    return state.items.reduce((total, item) => {
      const price = Number(item.price) || 0; // Đảm bảo giá là số
      const quantity = Number(item.quantity) || 0; // Đảm bảo số lượng là số
      return total + price * quantity;
    }, 0);
  };

  // Xử lý xác nhận đơn hàng
  const handleCheckout = () => {
    navigate('/checkout'); // Điều hướng đến trang checkout
  };

  return (
    <>
      {/* <Banner /> */}
      <Container>
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                {labels.map((label, index) => (
                  <TableCell key={index} align="center">
                    <Typography fontWeight={500}>{label}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {state.items.length > 0 ? (
                state.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="center">
                      <img src={item.image} alt={item.title} width={200} height={200} />
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontWeight={500}>{item.title}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontWeight={500}>{Number(item.price) || 0} VND</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontWeight={500}>{Number(item.quantity) || 0}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontWeight={500}>{(Number(item.price) || 0) * (Number(item.quantity) || 0)} VND</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleRemoveFromCart(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="h6">Giỏ hàng của bạn đang trống.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {state.items.length > 0 && (
          <Stack direction="row" spacing={2} mt={4} alignItems="center" justifyContent="flex-end">
            <Typography variant="h6" fontWeight={500}>
              Tổng tiền: {calculateTotalPrice()} VND
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
            >
              Xác nhận đơn hàng
            </Button>
          </Stack>
        )}
      </Container>
    </>
  );
}

export default Cart;
