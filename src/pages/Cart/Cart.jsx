import React from "react";
import CartItem from "../../components/CartItem/CartItem";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { ShoppingCart } from "@mui/icons-material";

// --------------------------------------------------------

const Cart = ({ cart, setCart, setProduct }) => {
  const Navigate = useNavigate();
  var subTotal = 0;
  var Total = 0;
  const shipping = 200;
  if (cart.products) {
    for (let index = 0; index < cart.products.length; index++) {
      subTotal =
        subTotal + cart.products[index].price * cart.products[index].quantity;
    }
  }
  if (subTotal !== 0) {
    Total = subTotal + shipping;
  }
  return (
    <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
      <Box>
        <Box
          sx={{
            width: 700,
            backgroundColor: "white",
            m: 2,
            height: 40,
            boxShadow: "0 2px 4px #0000001a, 0 8px 16px #0000001a",
            borderRadius: 2,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              color: "#e92e4a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShoppingCart sx={{ mr: 2 }} />
            Cart
          </h2>
        </Box>
        {cart ? (
          cart.products.map((product) => {
            return (
              <CartItem
                product={product}
                cartId={cart._id}
                setCart={setCart}
                setProduct={setProduct}
              />
            );
          })
        ) : (
          <></>
        )}
      </Box>
      <Box
        sx={{
          width: 480,
          background: "white",
          height: 350,
          borderRadius: 2,
          p: 2,
          m: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          boxShadow: "0 2px 4px #0000001a, 0 8px 16px #0000001a",
        }}
      >
        <h2> Order Summary</h2>
        <Box>
          <Box
            sx={{
              width: "100%",
              p: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h3>Sub Total:</h3>
            <p>PKR {subTotal}</p>
          </Box>
          <Box
            sx={{
              width: "100%",
              p: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h3>Shipping fee:</h3>
            <p>PKR {shipping}</p>
          </Box>
          <Box
            sx={{
              width: "100%",
              p: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h3>Total:</h3>
            <p>PKR {Total}</p>
          </Box>
          <Box sx={{ fontSize: 12, color: "#e92e4a", p: 1 }}>
            <p>* Tax Included.</p>
            <p>* Standard Shipping PKR 200 will be applied.</p>
            <p>* Maximum 5 per items can be ordered.</p>
          </Box>
        </Box>
        <Box sx={{ position: "reletive" }}>
          <Button
            color="success"
            variant="contained"
            fullWidth
            sx={{ position: "absolute", bottom: 0, left: 0 }}
            onClick={() => Navigate("/shop/checkOut")}
            disabled={cart ? (cart.products.length <= 0 ? true : false) : true}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
