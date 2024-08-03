import { Box, Container, Grid, Link, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        bgcolor: "#1976D2",
        color: "#fff",
        mt: 'auto',
        borderTop: '1px solid #444',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Tên Công Ty
            </Typography>
            <Typography variant="body2" component="p">
              Mô tả ngắn gọn về công ty của bạn và những gì nó làm. Bạn có thể thêm thông tin liên hệ hoặc các dịch vụ chính ở đây.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Liên Kết
            </Typography>
            <Grid container spacing={1}>
              <Grid item>
                <Link href="#" color="inherit" underline="hover">
                  Trang Chủ
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" color="inherit" underline="hover">
                  Sản Phẩm
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" color="inherit" underline="hover">
                  Về Chúng Tôi
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" color="inherit" underline="hover">
                  Liên Hệ
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Theo Dõi Chúng Tôi
            </Typography>
            <Grid container spacing={1}>
              <Grid item>
                <Link href="#" color="inherit" underline="hover">
                  Facebook
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" color="inherit" underline="hover">
                  Instagram
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" color="inherit" underline="hover">
                  Twitter
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="inherit">
            &copy; {new Date().getFullYear()} Tên Công Ty. Mọi quyền được bảo lưu.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
