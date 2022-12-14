import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ShoppingCartCheckout } from "@mui/icons-material";
import StripeCheckout from "react-stripe-checkout";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import StripeInput from "../../components/StripeInput";
import { useNavigate } from "react-router";
// --------------------------------------------------------
import { IMaskInput } from "react-imask";
import PropTypes from "prop-types";
// ======================================================
const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="#300-000-0000"
      definitions={{
        "#": /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
// =====================================================
const CheckOut = ({
  cart,
  setCart,
  user,
  setAlert,
  setOpenAlert,
  setSeverity,
}) => {
  const [loading, setLoading] = useState(false);
  // ==============================================
  const pay = () => {
    const data = {
      email: user.email,
      // source: req.body.stripeToken,
      fulName: values.fullName,
      address: values.address,
      amount: Total,
    };
    axios
      .post("http://localhost:8000/shop/payment", data)
      .then(() => {
        console.log("Done");
      })
      .catch((err) => {
        console.log("Error");
      });
  };
  // ==============================================
  const Navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const handlePayment = async (e) => {
    const data = {
      email: user.email,
      name: user.firstName + " " + user.lastName,
      address: values.address,
      amount: subTotal,
      // stripeToken: token,
    };
  };
  // ==============================================
  const [values, setValues] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    Payment: "",
  });
  const handleChange = (value) => (e) => {
    setValues({ ...values, [value]: e.target.value });
  };
  var subTotal = 0;
  var Total = 0;
  const shipping = 200;

  for (let index = 0; index < cart.products.length; index++) {
    subTotal =
      subTotal + cart.products[index].price * cart.products[index].quantity;
  }
  if (subTotal != 0) {
    Total = subTotal + shipping;
  }
  const checkOut = () => {
    if (cart.products.length <= 0) {
      alert("Cart Empty");
      return false;
    }
    if (
      !values.Payment ||
      !values.address ||
      !values.fullName ||
      !values.phoneNumber
    ) {
      setAlert("All Fields Are Required");
      setSeverity("info");
      setOpenAlert(true);
      return false;
    }
    const data = {
      userId: user._id,
      Name: user.firstName + " " + user.lastName,
      Address: values.address,
      Phone: values.phoneNumber,
      ShippingFee: shipping,
      TotalAmount: subTotal,
      products: cart.products,
      Payment: values.Payment === "Card Payment" ? "Cleared" : "Pending",
      cartId: cart._id,
    };
    axios
      .post("http://localhost:8000/shop/checkOut", data)
      .then((res) => {
        // alert();
        setAlert(res.data.status);
        setSeverity("success");
        setOpenAlert(true);
        const data = { _id: cart._id };
        axios
          .post("http://localhost:8000/shop/getCartById", data)
          .then((r) => {
            // alert(r.data.message ? r.data.message : r.data.error);
            setCart(r.data.cart);
            Navigate("/shop/cart");
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

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
            <ShoppingCartCheckout sx={{ mr: 2 }} />
            Check Out
          </h2>
        </Box>
        <Box
          sx={{
            width: 700,
            backgroundColor: "white",
            m: 2,
            // height: 40,
            boxShadow: "0 2px 4px #0000001a, 0 8px 16px #0000001a",
            borderRadius: 2,
            p: 2,
            // display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <TextField
            label="Full Name"
            variant="standard"
            color="success"
            name=""
            type="text"
            sx={{ width: "47.5%", m: 1 }}
            value={values.fullName}
            onChange={handleChange("fullName")}
            required
          />
          <TextField
            label="Address"
            variant="standard"
            color="success"
            name=""
            type="text"
            sx={{ width: "47.5%", m: 1 }}
            value={values.address}
            onChange={handleChange("address")}
            required
          />
          <FormControl color="success" sx={{ width: "47.5%", m: 1 }}>
            <InputLabel htmlFor="formatted-text-mask-input">
              Phone Number
            </InputLabel>
            <Input
              variant="standard"
              value={values.phoneNumber}
              onChange={handleChange("phoneNumber")}
              name="textmask"
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom}
              required
              // disabled={user.cnic ? true : false}
            />
          </FormControl>
          <Box sx={{ width: "100%" }}>
            <FormControl
              component="fieldset"
              sx={{ width: "100%", m: 1 }}
              color="success"
            >
              <FormLabel color="success">Payment Method</FormLabel>
              <RadioGroup
                name="spacing"
                aria-label="spacing"
                value={values.Payment}
                onChange={handleChange("Payment")}
                row
                color="success"
              >
                {["Cash On Delivery", "Card Payment"].map((value) => (
                  <FormControlLabel
                    color="success"
                    key={value}
                    value={value.toString()}
                    control={<Radio color="success" />}
                    label={value.toString()}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
          {values.Payment === "Card Payment" ? (
            <form onSubmit={handlePayment} className="PaymentForm">
              <TextField
                label="Credit Card Number"
                name="ccnumber"
                variant="standard"
                color="success"
                required
                sx={{ width: "47.5%", m: 1 }}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardNumberElement,
                  },
                }}
              />
              <TextField
                label="Expiration Date"
                name="ccexp"
                variant="standard"
                color="success"
                required
                sx={{ width: "47.5%", m: 1 }}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardExpiryElement,
                  },
                }}
              />
              <TextField
                label="CVC"
                name="cvc"
                variant="standard"
                color="success"
                required
                sx={{ width: "47.5%", m: 1 }}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardCvcElement,
                  },
                }}
              />
            </form>
          ) : (
            <></>
          )}
        </Box>
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
          {values.Payment === "Card Payment" ? (
            <Button
              color="success"
              variant="contained"
              fullWidth
              onClick={pay}
              sx={{ position: "absolute", bottom: 0, left: 0 }}
            >
              Pay and Proceed
            </Button>
          ) : (
            <Button
              color="success"
              variant="contained"
              fullWidth
              onClick={checkOut}
              disabled={values.Payment != "Cash On Delivery" ? true : false}
              sx={{ position: "absolute", bottom: 0, left: 0 }}
            >
              Proceed
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CheckOut;
