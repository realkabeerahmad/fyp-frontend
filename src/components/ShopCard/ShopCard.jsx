import { Box, Card } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ShopCard.css";

// -------------------------------------------------

const ShopCard = ({ Product, setProduct }) => {
  const { _id, name, Image, quantity, price } = Product;
  // const serverBaseURL = "http://localhost:8000/";

  function setShopDetails() {
    setProduct(Product);
  }

  return (
    <>
      <Link
        exact
        to={`/product/${_id}`}
        onClick={setShopDetails}
        className="ShopCardWrap"
      >
        <Card sx={{ width: 220, height: 270, m: 1 }}>
          <Box sx={{ height: 140, contain: "content" }}>
            <img src={Image} style={{ width: "100%" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              // alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 1,
              height: 140,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                // p: 1,
              }}
            >
              <h3>{name.slice(0, 10)}....</h3>
              <h4>PKR&nbsp;&nbsp;{price}</h4>
            </Box>
            <Box sx={{ alignSelf: "flex-end" }}>
              {quantity <= 0 ? "Out of Stock" : "In Stock"}
            </Box>
          </Box>
        </Card>
      </Link>
    </>
  );
};

export default ShopCard;
