import CallEndIcon from '@mui/icons-material/CallEnd';
import BookIcon from '@mui/icons-material/Book';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CategoryIcon from '@mui/icons-material/Category';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(1),
  width: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const LinkTypography = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  color: "white", // Changed from "black" to "white"
  display: "flex",
  alignItems: "center",
}));

const Spacer = styled("div")({
  flexGrow: 1,
});

function Header() {
  return (
    <AppBar position="static" style={{ backgroundColor: '#1976D2' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <AccountBoxIcon style={{ color: "white" }} /> {/* Changed color to white */}
        </IconButton>
        <LinkTypography variant="h6">
          <Link to="/admin" style={{ color: "inherit", textDecoration: "none" }}>
            ADMIN
          </Link>
        </LinkTypography>
        <LinkTypography variant="h6">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <HomeIcon style={{ color: "white" }} /> {/* Changed color to white */}
          </IconButton>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            TRANG CHỦ
          </Link>
        </LinkTypography>
        <LinkTypography variant="h6">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <CategoryIcon style={{ color: "white" }} /> {/* Changed color to white */}
          </IconButton>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            DANH MỤC
          </Link>
        </LinkTypography>
        <LinkTypography variant="h6">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <LocalGroceryStoreIcon style={{ color: "white" }} /> {/* Changed color to white */}
          </IconButton>
          <Link to="#" style={{ color: "inherit", textDecoration: "none" }}>
            SHOP
          </Link>
        </LinkTypography>
        <LinkTypography variant="h6">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <BookIcon style={{ color: "white" }} /> {/* Changed color to white */}
          </IconButton>
          <Link to="#" style={{ color: "inherit", textDecoration: "none" }}>
            BÀI VIẾT
          </Link>
        </LinkTypography>
        <LinkTypography variant="h6">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <CallEndIcon style={{ color: "white" }} /> {/* Changed color to white */}
          </IconButton>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            LIÊN HỆ
          </Link>
        </LinkTypography>
        <Spacer />
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <IconButton color="inherit">
          <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
            <AccountCircleIcon style={{ color: "white" }} /> {/* Changed color to white */}
          </Link>
        </IconButton>
        <IconButton color="inherit">
          <Link to="/cart" style={{ color: "inherit", textDecoration: "none" }}>
            <ShoppingCartIcon style={{ color: "white" }} /> {/* Changed color to white */}
          </Link>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
