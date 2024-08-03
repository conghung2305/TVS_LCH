import {
    Box,
    Button,
    Container,
    Paper,
    Snackbar,
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
import { useLoading } from "src/contexts/loading";
import { Categories } from "src/types/Product";

function AdminCategoriesList() {
    const { setLoading } = useLoading();
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [products, setProducts] = useState<Categories[]>([]);
    const [idDelete, setIdDelete] = useState<string | null>(null);

    const getAllList = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/categories");
            setProducts(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllList();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete("/categories/" + id);
            setSnackbarMessage("Xóa danh mục thành công.");
            setShowSnackbar(true);
            getAllList();
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseSnackbar = () => {
        setShowSnackbar(false);
    };

    return (
        <Container>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
            <Stack gap={2}>
                <Typography variant="h2" textAlign="center">
                    Danh Sách Danh Mục
                </Typography>
                <Link to="/admin/categories/add">
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "#1976d2", 
                            color: "#fff", 
                            "&:hover": {
                                bgcolor: "#005bb5", 
                            },
                        }}
                    >
                        Thêm Danh Mục
                    </Button>
                </Link>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ border: "1px solid #ddd" }}>Tên</TableCell>
                                <TableCell align="right" style={{ border: "1px solid #ddd" }}>Mô Tả</TableCell>
                                <TableCell align="center" style={{ border: "1px solid #ddd" }}>Hành Động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((category, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row" style={{ border: "1px solid #ddd" }}>
                                        {category.name}
                                    </TableCell>
                                    <TableCell align="right" style={{ border: "1px solid #ddd" }}>{category.description}</TableCell>
                                    <TableCell align="center" style={{ border: "1px solid #ddd" }}>
                                        <Stack direction="row" spacing={3} justifyContent="center">
                                            <Link to={`/admin/categories/edit/${category._id}`}>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        bgcolor: "#1976d2",
                                                        color: "#fff",
                                                        "&:hover": {
                                                            bgcolor: "#0069d9",
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
                                                onClick={() => setIdDelete(category._id)}
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
                        Xác nhận xóa danh mục
                    </Typography>
                    <Typography variant="body1" mb={2}>
                        Bạn có chắc chắn muốn xóa danh mục này?
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleDelete(idDelete);
                                setIdDelete(null);
                            }}
                        >
                            Xác nhận
                        </Button>
                        <Button variant="contained" onClick={() => setIdDelete(null)}>
                            Hủy
                        </Button>
                    </Stack>
                </Box>
            )}
        </Container>
    );
}

export default AdminCategoriesList;
