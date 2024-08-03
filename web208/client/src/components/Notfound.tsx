import React from 'react';
import { Typography, Box } from '@mui/material';

const NotFoundPage: React.FC = () => {
  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Không tìm thấy trang
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Trang bạn đang tìm kiếm không tồn tại.
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
