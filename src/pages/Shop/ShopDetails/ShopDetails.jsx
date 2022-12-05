import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ShopDetails.css";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";
import { Add, AddShoppingCartSharp, Remove } from "@mui/icons-material";
const ShopDetails = ({ Product, cart, setCart, login }) => {
  const Navigate = useNavigate();
  const Server = "http://localhost:8000/";
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
        .post("http://localhost:8000/shop/addToCart", data)
        .then((res) => {
          if (res.data.status === "failed") {
            alert(res.data.message ? res.data.message : res.data.error);
          } else {
            const data = { _id: cart._id };
            // console.log(cart);
            axios
              .post("http://localhost:8000/shop/getCartById", data)
              .then((res) => {
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
  return (
    <Box className="Details" sx={{ overflow: "hidden" }}>
      <div className="Details-Left">
        <Link to="/shop">
          <i className="fa fa-arrow-left"></i>
        </Link>
        <img src={Server + Product.Image} alt={Product._id} />
      </div>
      <Box
        className="Details-Right"
        sx={{ overflow: "hidden", overflowX: "hidden" }}
      >
        <div className="Details-intro">
          <h1 style={{ maxWidth: "80%" }}>{Product.name.toUpperCase()}</h1>
          <h2>PKR {Product.price}</h2>
        </div>
        <div className="Details-details">
          <p className="details-description">
            {Product.description
              ? Product.description.slice(0, 250)
              : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum placeat atque delectus fugiat temporibus minima consequatur animi, veniam ipsam. Distinctio, excepturi voluptatem sapiente maxime expedita vel. Deleniti doloribus laborum magni dicta co"}
          </p>
          <table>
            <tbody>
              <tr>
                <th>Warranty:</th>
                <td>{Product.Warranty}</td>
                <th>Return:</th>
                <td>{Product.Return}</td>
              </tr>
              <tr>
                <th>Standard Shipping:</th>
                <td>{Product.StandardShipping}</td>
                <th>Fast Shipping:</th>
                <td>{Product.FastShipping}</td>
              </tr>
              <tr>
                <th>Availability:</th>
                <td>{Product.quantity > 0 ? "Instock" : "N/A"}</td>
                <th></th>
                <td></td>
              </tr>
            </tbody>
          </table>
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
          </Box>
        </div>
        <div className="details-button">
          {/* <div className="details-fav">
            <i className="fa fa-heart"></i>
          </div>
          <div className="details-buyNow">BUY NOW</div> */}
          <Button
            color="error"
            variant="contained"
            sx={{
              fontSize: 20,
              position: "sticky",
              bottom: 0,
              width: "100%",
              justifyContent: "center",
            }}
            onClick={addToCart}
            disabled={Product.quantity <= 0 ? true : false}
          >
            <AddShoppingCartSharp />
            &nbsp;&nbsp;ADD TO CART
          </Button>
        </div>
      </Box>
    </Box>
  );
};
export default ShopDetails;
