import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product } from "../types/Product";
import { Link } from "react-router-dom";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card
      sx={{
        width: 300,
        mx: "auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardMedia
        component="img"
        alt={product.title}
        height="180"
        image={product.image}
      />
      <CardContent sx={{ textAlign: "center", p: 2 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          {product.title}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ color: "#1976d2" }}
        >
          {product.price} VND
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", p: 2 }}>
        <Button
          size="small"
          component={Link}
          to={`/product/${product._id}`}
          sx={{
            bgcolor: "#1976d2",
            color: "#fff",
            "&:hover": {
              bgcolor: "#005bb5",
            },
            fontWeight: "bold",
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            mx: 1,
          }}
        >
          Chi Tiết
        </Button>
        <Button
          size="small"
          sx={{
            bgcolor: "#dc004e",
            color: "#fff",
            "&:hover": {
              bgcolor: "#9a0036",
            },
            fontWeight: "bold",
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            mx: 1,
          }}
        >
          Tìm hiểu Thêm
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
