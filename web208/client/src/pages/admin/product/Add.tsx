import { Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "src/components/ProductForm";
import { useLoading } from "src/contexts/loading";
import { ProductFormParams } from "src/types/Product";

function AdminProductAdd() {
  const nav = useNavigate();
  const { setLoading } = useLoading();
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await axios.get("http://localhost:3000/categories");
        setCategories(response.data.map((category: any) => ({
          value: category._id,
          label: category.name
        })));
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (values: ProductFormParams) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:3000/products", values);
      nav("/admin/product/list");
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Stack gap={2}>
        <Typography variant="h3" textAlign="center">
          Thêm Sản Phẩm
        </Typography>
        {loadingCategories ? (
          <Typography>Loading categories...</Typography>
        ) : (
          <ProductForm onSubmit={onSubmit} initialValues={{ isShow: true }} categories={categories} />
        )}
      </Stack>
    </Container>
  );
}

export default AdminProductAdd;
