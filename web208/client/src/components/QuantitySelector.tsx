import { Button, IconButton, Typography, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type QuantitySelectorProps = {
  quantity: number;
  setQuantity: (quantity: number) => void;
};

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, setQuantity }) => {
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={decreaseQuantity}>
        <RemoveIcon />
      </IconButton>
      <Typography variant="body1" sx={{ mx: 2 }}>
        {quantity}
      </Typography>
      <IconButton onClick={increaseQuantity}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
