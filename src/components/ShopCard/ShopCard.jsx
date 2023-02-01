import { Box, Card } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ShopCard.css";

// -------------------------------------------------

const ShopCard = ({ Product, setProduct }) => {
  const { _id, name, Image, quantity, price } = Product;
  function setShopDetails() {
    setProduct(Product);
  }
  return (
    <Box sx={{ gridRow: "span 1", gridColumn: "span 1" }} className="Hover">
      <Link
        exact
        to={`/product/${_id}`}
        onClick={setShopDetails}
        className="ShopCardWrap">
        <Box
          className="Hover"
          sx={{
            width: 220,
            height: 270,
            backgroundColor: "white",
            borderRadius: 2,
            color: "#2f2f2f",
          }}>
          <Box sx={{ height: 140, contain: "content" }}>
            <img src={Image} style={{ width: "100%" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 1,
              height: 140,
            }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <h3>{name.slice(0, 10)}....</h3>
              <h4>PKR&nbsp;&nbsp;{price}</h4>
            </Box>
            <Box sx={{ alignSelf: "flex-end" }}>
              {quantity <= 0 ? "Out of Stock" : "In Stock"}
            </Box>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default ShopCard;
