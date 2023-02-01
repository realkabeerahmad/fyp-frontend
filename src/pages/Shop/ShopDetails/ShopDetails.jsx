import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShopDetails.css";
import axios from "axios";
import { Box, Button, IconButton, Rating } from "@mui/material";
import {
  Add,
  AddShoppingCartSharp,
  ArrowBack,
  Remove,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import url from "../../../apiCalls/api";
const ShopDetails = ({ Product, cart, setCart, login, user, setUser }) => {
  const Navigate = useNavigate();
  const [product, setProduct] = React.useState(Product);
  const [value, setValue] = useState(0);
  var [liked, setLiked] = useState(false);
  var [first, setFirst] = useState(true);
  if (login) {
    if (
      (user.product_wish.length > 0 && first) ||
      (Product.rating.length > 0 && first)
    ) {
      for (let i = 0; i < user.product_wish.length; i++) {
        if (user.product_wish[i]._id === Product._id) {
          setLiked(true);
          break;
        }
      }
      for (let i = 0; i < Product.rating.length; i++) {
        if (user._id === Product.rating.userid) {
          // setLiked(true);
          console.log("Found");
          break;
        }
      }

      setFirst(false);
    }
  }
  console.log(product);
  var [quantity, setQuantity] = useState(1);
  const decr = () => {
    if (quantity === 1) {
      return false;
    } else {
      setQuantity(quantity - 1);
      console.log(quantity);
    }
  };
  const incr = () => {
    if (quantity === 5) {
      return false;
    } else {
      setQuantity(quantity + 1);
      console.log(quantity);
    }
  };
  const addToCart = () => {
    if (login) {
      const data = {
        cartId: cart._id,
        _id: Product._id,
        name: Product.name,
        image: Product.Image,
        quantity: quantity,
        price: Product.price,
      };

      axios
        .post(url + "/shop/cart/add", data)
        .then((res) => {
          if (res.data.status === "failed") {
            alert(res.data.message ? res.data.message : res.data.error);
          } else {
            const data = { _id: cart._id };
            // console.log(cart);
            axios.post(url + "/shop/cart/show/id", data).then((res) => {
              if (res.data.status === "failed") {
                alert(res.data.message);
              } else {
                setCart(res.data.cart);
              }
            });
          }
        })
        .catch((err) => {
          alert(err);
          console.log("Not Done");
        });
    } else {
      Navigate("/login");
    }
  };
  const wish = () => {
    if (login) {
      const data = { userId: user._id, _id: Product._id };
      axios
        .post(url + "/shop/wish", data)
        .then((res) => {
          if (res.data.status === "success") {
            setUser(res.data.data);
            // setFirst(false);
            if (res.data.message === "Added to WishList") {
              setLiked(true);
            } else if (res.data.message === "Removed from WishList") {
              setLiked(false);
            }
            // alert(res.data.message);
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      Navigate("/login");
    }
  };
  const rate = (newValue) => {
    if (login) {
      const data = { userId: user._id, _id: Product._id, value: value };
      setValue(newValue);
      axios
        .post(url + "/shop/rate", data)
        .then((res) => {
          if (res.data.status === "success") {
            console.log(res.data);
            setProduct(res.data.data);
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      Navigate("/login");
    }
  };
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}>
      <IconButton
        sx={{ position: "absolute", top: 10, left: 10 }}
        onClick={() => Navigate(-1)}>
        <ArrowBack />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "80%",
          height: 400,
          backgroundColor: "white",
          borderRadius: 2,
          // position: "relative",
        }}>
        <Box sx={{ width: "350", p: 1, position: "relative" }}>
          <Box
            sx={{
              width: "330",
              height: 330,
              contain: "content",
              borderRadius: 2,
            }}>
            <img src={product.Image} alt={product._id} width={330} />
          </Box>
          {/* <Box>

          </Box> */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              p: 1,
            }}>
            <Button
              color="error"
              variant="text"
              sx={{
                fontSize: 20,
                justifyContent: "center",
                width: "20%",
              }}
              onClick={wish}>
              {liked ? <Favorite /> : <FavoriteBorder />}
            </Button>
            <Button
              color="error"
              variant="contained"
              sx={{
                fontSize: 15,
                justifyContent: "center",
                width: "80%",
              }}
              onClick={addToCart}
              disabled={product.quantity <= 0 ? true : false}>
              <AddShoppingCartSharp sx={{ mr: 1 }} />
              ADD TO CART
            </Button>
          </Box>
        </Box>
        <Box sx={{ p: 1 }}>
          <p style={{ fontSize: 30 }}>{product.name.toUpperCase()}</p>
          <Rating value={product.totalRating} disabled />
          <Box>
            <Box sx={{ textAlign: "justify", width: 400 }}>
              {product.description
                ? product.description.slice(0, 250)
                : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum placeat atque delectus fugiat temporibus minima consequatur animi, veniam ipsam. Distinctio, excepturi voluptatem sapiente maxime expedita vel. Deleniti doloribus laborum magni dicta co"}
            </Box>

            <Box>
              <Box sx={{ color: "#2f2f2f", display: "flex", p: 1, mt: 1 }}>
                <h4>Quantity:</h4>
                <Button onClick={incr} color="error">
                  <Add sx={{ p: 0, fontSize: 15 }} />
                </Button>
                <input
                  className="quantity"
                  type="number"
                  min="1"
                  max="5"
                  value={quantity}
                  onChange={quantity}
                  // onBlur={onBlur}
                  disabled
                />
                <Button onClick={decr} color="error">
                  <Remove sx={{ p: 0, fontSize: 15 }} />
                </Button>
              </Box>
              <Box sx={{ p: 1, color: "#e92e4a", fontSize: 12 }}>
                * Maximum 5 per items can be ordered once.
              </Box>
              <Box>
                <Rating
                  value={value}
                  onChange={(event, newValue) => {
                    rate(newValue);
                  }}
                />
              </Box>
              <Box sx={{ p: 1, color: "#e92e4a", fontSize: 12 }}>
                * Rating can't be changed once added.
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            p: 1,
            width: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}>
          <p style={{ fontSize: 20, padding: "10px 20px" }}>
            PKR {product.price}
          </p>
          <table>
            <tbody>
              <tr>
                <th>Warranty:</th>
                <td>{product.Warranty}</td>
              </tr>
              <tr>
                <th>Return:</th>
                <td>{product.Return}</td>
              </tr>
              <tr>
                <th>Standard Shipping:</th>
                <td>{product.StandardShipping}</td>
              </tr>
              <tr>
                <th>Fast Shipping:</th>
                <td>{product.FastShipping}</td>
              </tr>
              <tr>
                <th>Availability:</th>
                <td>{product.quantity > 0 ? "Instock" : "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Box>
    </Box>
  );
};
export default ShopDetails;
