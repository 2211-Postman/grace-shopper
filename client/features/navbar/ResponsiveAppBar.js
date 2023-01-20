import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link, Badge } from "@mui/material";

import { logout } from "../../app/store";
import { emptyCart } from "../cart/cartSlice";
import { makeStyles } from "@material-ui/core/styles";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const useStyles = makeStyles((theme) => ({
  shopButton: {
    color: "white",
    marginLeft: theme.spacing(2),
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

function ResponsiveAppBar({ pages, pageLabels, homeTitle, itemsInCart }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logoutAndRedirectHome = () => {
    dispatch(emptyCart());
    dispatch(logout());
    navigate("/login");
  };

  const classes = useStyles();

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            {homeTitle}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="white"
            >
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <IconButton
                className={classes.shopButton}
                aria-label="shop"
                onClick={() => navigate("/shop")}
              >
                <StoreIcon sx={{ color: "black" }} />
              </IconButton>
              <IconButton
                className={classes.cartButton}
                aria-label="cart"
                onClick={() => navigate("/cart")}
              >
                <Badge
                  aria-label={itemsInCart}
                  badgeContent={itemsInCart}
                  max={99}
                  color="primary"
                >
                  <ShoppingCartIcon sx={{ color: "black" }} />
                </Badge>
              </IconButton>
              {pages.map((page, i) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  {page === "logout" ? (
                    <div
                      container
                      justify="flex-end"
                      onClick={logoutAndRedirectHome}
                    >
                      Logout
                    </div>
                  ) : (
                    <Link color="black" underline="hover" href={`/${page}`}>
                      <Typography textAlign="center">
                        {pageLabels[i]}
                      </Typography>
                    </Link>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            {homeTitle}
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            justifyContent="flex-end"
          >
            <IconButton
              className={classes.shopButton}
              aria-label="shop"
              onClick={() => navigate("/shop")}
            >
              <StoreIcon sx={{ color: "white" }} />
            </IconButton>
            <IconButton
              className={classes.cartButton}
              aria-label="cart"
              onClick={() => navigate("/cart")}
            >
              <Badge
                aria-label={itemsInCart}
                badgeContent={itemsInCart}
                max={99}
                color="primary"
              >
                <ShoppingCartIcon sx={{ color: "white" }} />
              </Badge>
            </IconButton>
            {pages.map((page, i) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page === "logout" ? (
                  <div onClick={logoutAndRedirectHome}>Logout</div>
                ) : (
                  <Link
                    color="white"
                    underline="hover"
                    href={`/${page}`}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyItems: "speace-evenly",
                    }}
                  >
                    {pageLabels[i]}
                  </Link>
                )}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
