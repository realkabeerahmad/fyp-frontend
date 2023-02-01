import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Add, Remove } from "@mui/icons-material";
import url from "../../apiCalls/api";

// -------------------------------------------------

const CartItem = ({ product, cartId, setCart, setProduct }) => {
  var quantity = product.quantity;
  const getProduct = async () => {
    await axios
      .get(url + `/shop/show${product._id}`)
      .then((res) => {
        setProduct(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const decr = () => {
    if (quantity === 1) {
      return false;
    } else {
      quantity = quantity - 1;
      updateQuantity();
    }
  };
  const incr = () => {
    if (quantity === 5) {
      return false;
    } else {
      quantity = quantity + 1;
      updateQuantity();
    }
  };
  const deleteProduct = () => {
    const data = {
      cartId: cartId,
      _id: product._id,
      quantity: product.quantity,
    };
    axios
      .post(url + "/shop/cart/delete", data)
      .then((res) => {
        if (res.data.status === "failed") {
          alert(res.data.message);
        } else {
          const data = { _id: cartId };
          axios
            .post(url + "/shop/cart/show/id", data)
            .then((r) => {
              if (res.data.status === "failed") {
                alert(res.data.message);
              } else {
                setCart(r.data.cart);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateQuantity = () => {
    const data = { cartId: cartId, _id: product._id, quantity: quantity };
    axios
      .post(url + "/shop//cart/update/quantity", data)
      .then((res) => {
        if (res.data.status === "failed") {
          alert(res.data.message);
        } else {
          const data = { _id: cartId };
          axios
            .post(url + "/shop/cart/show/id", data)
            .then((r) => {
              if (res.data.status === "failed") {
                alert(res.data.message);
              } else {
                setCart(r.data.cart);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //---------------------------------------------------------------
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          width: 700,
          backgroundColor: "white",
          m: 2,
          height: 180,
          boxShadow: "0 2px 4px #0000001a, 0 8px 16px #0000001a",
          borderRadius: 2,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 150,
            height: 150,
            contain: "content",
            display: "flex",
            aliginItems: "center",
            justifyContent: "center",
            backgroundColor: "#00000010",
          }}
        >
          <img src={product.Image} alt="" style={{ width: "100%" }} />
        </Box>
        <Box sx={{ width: "80%", p: 2 }}>
          <Box
            sx={{
              width: "100%",
              height: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Link
              to={"/product/" + product._id}
              style={{ color: "black", width: "100%" }}
              onClick={async () => await getProduct()}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <h2>{product.name.slice(0, 20)}.....</h2>
                <p>PKR {product.price}</p>
              </Box>
            </Link>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <p>
                <b>Quantity:</b>&nbsp;&nbsp;
                <Button onClick={incr} color="error">
                  <Add sx={{ p: 0, fontSize: 15 }} />
                </Button>
                <input
                  className="quantity"
                  type="number"
                  min="1"
                  max="5"
                  value={quantity}
                  // onChange={handleChange}
                  // onBlur={onBlur}
                  disabled
                />
                <Button onClick={decr} color="error">
                  <Remove sx={{ p: 0, fontSize: 15 }} />
                </Button>
                {/* {product.quantity} */}
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          right: 40,
          transition: "color 0.5s",
          cursor: "pointer",
        }}
        onClick={deleteProduct}
        className="del-btn"
      >
        <DeleteIcon />
      </Box>
    </Box>
  );
};

export default CartItem;
