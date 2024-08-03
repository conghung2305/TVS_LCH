import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import axios from "axios";
import {
  Box
 
} from "@mui/material";
import { Product } from "./types/Product";
import Loading from "./components/Loading";

function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={2}
    >
      {loading ? (
        <Loading isShow={loading} />
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(240px, 1fr))"
          gap={3}
          justifyContent="center"
          width="100%"
          maxWidth="1200px"
        >
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Homepage;
