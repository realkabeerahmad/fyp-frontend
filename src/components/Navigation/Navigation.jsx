import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./Navigation.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { LogoutRounded } from "@mui/icons-material";

// ------------------------------------------------------

const Navigation = ({
  login,
  setLogin,
  user,
  setUser,
  cart,
  setCart,
  setAlert,
  setOpenAlert,
  setSeverity,
}) => {
  const isShelter = user ? (user.isShelter ? true : false) : false;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const Navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setLogin(false);
    setCart([]);
    setUser({});
    handleClose();
    Navigate("/login");
    setAlert("You have been Logged out");
    setSeverity("success");
    setOpenAlert(true);
  };
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const activeClassName = "is-active";

  var cartCount = cart && cart.products ? cart.products.length : 0;
  // console.log(cart.products ? cart.products.length : 0);
  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <img src={Logo} alt="" />
      </div>
      <div className="nav">
        <div className="nav-links">
          <NavLink
            exact={true}
            to="/"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Home
          </NavLink>
          {login ? (
            <>
              <NavLink
                to="/my_pets"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                My Pets
              </NavLink>
            </>
          ) : (
            <></>
          )}

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Shop
          </NavLink>
          {isShelter ? (
            <NavLink
              to="/shelter/applications"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Applications
            </NavLink>
          ) : (
            <NavLink
              to="/adopt"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Adopt
            </NavLink>
          )}
          <NavLink
            to="/community"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Community
          </NavLink>
        </div>
        <Box
          className="auth_links"
          sx={{
            display: "flex",
            aliginItems: "center",
            justifyContent: "center",
            // p: 1,
          }}
        >
          <NavLink
            to="/shop/cart"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            <Box
              sx={{
                display: "flex",
                aliginItems: "center",
                justifyContent: "center",
                p: 1,
              }}
            >
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </Box>
          </NavLink>
          {login ? (
            <>
              <Tooltip title="User Account Area">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    sx={{ width: 30, height: 30, backgroundColor: "white" }}
                  >
                    <img src={user.Image} alt="" style={{ height: 30 }} />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <div className="nav-menu">
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <Link style={{ color: "black" }} to="/user">
                    <MenuItem onClick={handleClose} sx={style}>
                      <Box
                        sx={{
                          borderRadius: "50%",
                          contain: "content",
                          width: "25px",
                          height: "25px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={user.Image}
                          alt=""
                          style={{ height: "25px" }}
                        />
                      </Box>
                      &nbsp; &nbsp;
                      {user.name}
                    </MenuItem>
                  </Link>
                  <Link to="/user/wishlist" style={{ color: "black" }}>
                    <MenuItem onClick={handleClose} sx={style}>
                      My Wishlist
                    </MenuItem>
                  </Link>
                  <Link to="/user/orders" style={{ color: "black" }}>
                    <MenuItem onClick={handleClose} sx={style}>
                      My Orders
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout} sx={style}>
                    <LogoutRounded sx={{ mr: 1, color: "#e92e4a" }} />
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                Login
              </NavLink>{" "}
              |{" "}
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                Register
              </NavLink>
            </>
          )}
        </Box>
      </div>
    </nav>
  );
};

export default Navigation;
