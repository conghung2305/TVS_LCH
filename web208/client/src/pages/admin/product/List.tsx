import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Flash from "src/components/Flash";
import { useLoading } from "src/contexts/loading";
import { Product } from "src/types/Product";

interface FlashProps {
  isShow: boolean;
  open: boolean;
  message: string;
  onClose: () => void;
}

function AdminProductList() {
  const { setLoading } = useLoading();
  const [showFlash, setShowFlash] = useState(false);
  const [flashProps, setFlashProps] = useState<FlashProps>({
    isShow: false,
    open: false,
    message: "",
    onClose: () => setShowFlash(false),
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [idDelete, setIdDelete] = useState<string | null>(null);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/products"); 
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete("/products/" + id);
      setFlashProps({
        isShow: true,
        open: true,
        message: "Xóa sản phẩm thành công.",
        onClose: () => setShowFlash(false),
      });
      getAllProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Flash {...flashProps} />
      <Stack gap={2}>
        <Typography variant="h2" textAlign="center">
          Danh Sách Sản Phẩm
        </Typography>
        <Link to="/admin/product/add">
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#1976d2', 
              color: '#fff', 
              '&:hover': {
                backgroundColor: '#1565c0', 
              },
              margin: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '8px',
            }}
          >
            Thêm Sản Phẩm
          </Button>
        </Link>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ border: "1px solid #ddd" }}>Tiêu Đề</TableCell>
                <TableCell align="right" style={{ border: "1px solid #ddd" }}>Giá</TableCell>
                <TableCell align="right" style={{ border: "1px solid #ddd" }}>Mô Tả</TableCell>
                <TableCell align="right" style={{ border: "1px solid #ddd" }}>Hình Ảnh</TableCell>
                <TableCell align="right" style={{ border: "1px solid #ddd" }}>Danh Mục</TableCell>
                <TableCell align="center" style={{ border: "1px solid #ddd" }}>Hành Động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" style={{ border: "1px solid #ddd" }}>
                    {product.title}
                  </TableCell>
                  <TableCell align="right" style={{ border: "1px solid #ddd" }}>{product.price}</TableCell>
                  <TableCell align="right" style={{ border: "1px solid #ddd" }}>{product.description}</TableCell>
                  <TableCell align="right" style={{ border: "1px solid #ddd" }}>
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell align="right" style={{ border: "1px solid #ddd" }}>{product.category?.name}</TableCell>
                  <TableCell align="center" style={{ border: "1px solid #ddd" }}>
                    <Stack direction="row" spacing={3} justifyContent="center">
                      <Link to={`/admin/product/edit/${product._id}`}>
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: "#1976d2",
                            color: "#fff",
                            "&:hover": {
                              bgcolor: "#1565c0",
                            },
                          }}
                        >
                          Sửa
                        </Button>
                      </Link>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#dc3545",
                          color: "#fff",
                          "&:hover": {
                            bgcolor: "#c82333",
                          },
                        }}
                        onClick={() => setIdDelete(product._id)}
                      >
                        Xóa
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      {idDelete && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#fff",
            boxShadow: 4,
            p: 3,
          }}
        >
          <Typography variant="h5" mb={2}>
            Xác nhận xóa sản phẩm
          </Typography>
          <Typography variant="body1" mb={2}>
            Bạn có chắc chắn muốn xóa sản phẩm này?
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#1976d2",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#1565c0",
                },
              }}
              onClick={() => {
                handleDelete(idDelete);
                setIdDelete(null);
              }}
            >
              Xác nhận
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#dc3545",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#c82333",
                },
              }}
              onClick={() => setIdDelete(null)}
            >
              Hủy
            </Button>
          </Stack>
        </Box>
      )}
    </Container>
  );
}

export default AdminProductList;
