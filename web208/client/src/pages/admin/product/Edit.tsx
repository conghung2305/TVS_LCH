import { Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "src/components/ProductForm";
import { useLoading } from "src/contexts/loading";
import { Product, ProductFormParams } from "src/types/Product";

function AdminProductEdit() {
  const nav = useNavigate();
  const { id } = useParams();
  const { setLoading } = useLoading();
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [product, setProduct] = useState<Product | undefined>();

  const getProduct = async (id: string) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await axios.get("http://localhost:3000/categories");
      setCategories(
        response.data.map((category: any) => ({
          value: category._id,
          label: category.name,
        }))
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    getProduct(id);
    fetchCategories();
  }, [id]);

  const onSubmit = async (values: ProductFormParams) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:3000/products/${id}`, values);
      nav("/admin/product/list");
    } catch (error) {
      console.error("Error editing product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Stack gap={2}>
        <Typography variant="h3" textAlign="center">
          Edit Product
        </Typography>
        {loadingCategories ? (
          <Typography>Loading categories...</Typography>
        ) : (
          <ProductForm
            onSubmit={onSubmit}
            initialValues={product}
            categories={categories}
          />
        )}
      </Stack>
    </Container>
  );
}

export default AdminProductEdit;
