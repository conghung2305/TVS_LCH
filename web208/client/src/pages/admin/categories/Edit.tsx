import { Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoriesForm from "src/components/CategoriesForm";
import { useLoading } from "src/contexts/loading";
import { CategoriesFormParams } from "src/types/Product";

function AdminCategoriesEdit() {
  const nav = useNavigate();
  const { setLoading } = useLoading();
  const { id } = useParams();

  const [category, setCategory] = useState<CategoriesFormParams>({
    name: "",
    description: "", 
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/categories/${id}`);
        setCategory(data);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (values: CategoriesFormParams) => {
    try {
      setLoading(true);
      await axios.put(`/categories/${id}`, values);
      nav("/admin/categories/list");
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Stack gap={2}>
        <Typography variant="h3" textAlign="center">
          Chỉnh Sửa Danh Mục
        </Typography>
        <CategoriesForm initialValues={category} onSubmit={handleSubmit} />
      </Stack>
    </Container>
  );
}

export default AdminCategoriesEdit;
