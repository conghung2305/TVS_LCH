import { Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoriesForm from "src/components/CategoriesForm";
import { useLoading } from "src/contexts/loading";
import { CategoriesFormParams } from "src/types/Product";

function AdminCategories() {
  const nav = useNavigate();
  const { setLoading } = useLoading();

  const onSubmit = async (values: CategoriesFormParams) => {
    try {
      setLoading(true);
      await axios.post("/categories", values);
      nav("/admin/categories/list");
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Stack gap={2}>
        <Typography variant="h3" textAlign="center">
          Thêm Danh Mục Sản Phẩm
        </Typography>
        <CategoriesForm onSubmit={onSubmit} initialValues={{ isShow: true }} />
      </Stack>
    </Container>
  );
}

export default AdminCategories;
