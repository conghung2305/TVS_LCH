import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Stack, Typography, CircularProgress, Button, Snackbar, Alert } from "@mui/material";
import { Product } from "src/types/Product";
import QuantitySelector from "src/components/QuantitySelector";
import { useCart } from "src/contexts/CartContext";
import StarIcon from '@mui/icons-material/Star';

function ProductDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const { state, dispatch } = useCart();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const getProduct = async (_id: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`products/${_id}`);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        ...product,
        id: product._id,
        quantity
      };
      dispatch({ type: 'ADD_TO_CART', payload: cartItem });
      setSnackbarMessage('Sản phẩm đã được thêm vào giỏ hàng!');
      setOpenSnackbar(true);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return <Typography variant="h6" textAlign="center">Không tìm thấy sản phẩm</Typography>;
  }

  return (
    <>
      <Box sx={{ my: 6 }}>
        <Container>
          <Stack direction="row" spacing={4} alignItems="flex-start">
            <Box
              sx={{
                width: { xs: "100%", sm: "470px" },
                borderRadius: 2,
                boxShadow: 3,
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.title}
                sx={{
                  width: '100%',
                  borderRadius: 5,
                }}
              />
            </Box>
            <Stack spacing={3} sx={{ flex: 1 }}>
              <Typography component="h1" variant="h4" fontWeight="bold">
                {product.title}
              </Typography>
              <Box sx={{ width: { xs: "100%", sm: "300px" } }}>
                <Button
                  variant="contained"
                  sx={{
                    mb: 2,
                    width: '50%',
                    bgcolor: 'black',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'grey.800',
                    }
                  }}
                >
                  New
                </Button>
              </Box>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center">
                  <Typography variant="h6" sx={{ color: "black", mr: 1 }}>
                    Giá tiền: {product.price} VND
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon key={index} sx={{ color: "gold", fontSize: 24 }} />
                  ))}
                </Stack>
              </Stack>
              <Typography variant="body1" color="text.secondary">
                {product.description}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                <Button variant="contained" onClick={handleAddToCart}>
                  Thêm vào giỏ hàng
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
     
      {/* Snackbar thông báo */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{
          vertical: 'top', // Vị trí dọc (trên)
          horizontal: 'right', // Vị trí ngang (bên phải)
        }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ProductDetail;
