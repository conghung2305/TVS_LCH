import { useState } from 'react';
import { Button, Typography, IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconButton onClick={handleDecrease} size="small" aria-label="remove">
        <RemoveIcon />
      </IconButton>
      <Typography variant="body1">{quantity}</Typography>
      <IconButton onClick={handleIncrease} size="small" aria-label="add">
        <AddIcon />
      </IconButton>
      <Button variant="contained" color="primary">
        Thêm vào giỏ hàng
      </Button>
    </Stack>
  );
};

export default QuantitySelector;
