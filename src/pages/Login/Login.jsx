import { Box, TextField, Button, Divider } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { LoadingButton } from "@mui/lab";
import url from "../../apiCalls/api";

const Login = ({
  setAlert,
  setOpenAlert,
  setLogin,
  setSeverity,
  setUser,
  user,
  setUserDetails,
  setCart,
}) => {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "umarjamshaid25@gmail.com",
    password: "Smaku-05",
  });
  const { email, password } = values;
  const handleChange = (value) => (e) => {
    setValues({ ...values, [value]: e.target.value });
  };
  const login = () => {
    setLoading(true);
    const { email, password } = values;
    if (email && password) {
      axios
        .post(url + "/auth/login", values)
        .then((res) => {
          setUser(res.data.user);
          if (res.data.status === "success") {
            setAlert("Welcome!!!");
            setOpenAlert(true);
            setSeverity("success");
            Navigate("/my_pets");
            setLoading(false);
            setLogin(true);

            const userId = { userId: res.data.user._id };
            axios
              .post("http://localhost:8000/shop/cart", userId)
              .then((res) => {
                if (res.data.status === "success") {
                  axios
                    .post("http://localhost:8000/shop/getCart", userId)
                    .then((res) => {
                      if (res.data.status === "success" && res.data.cart) {
                        console.log(res.data.cart[0]);
                        setCart(res.data.cart[0]);
                      }
                    });
                } else if (res.data.status === "failed" && res.data.cart) {
                  console.log(res.data.cart);
                  setCart(res.data.cart);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (res.data.status === "pending") {
            setUserDetails({
              userId: res.data.user._id,
              email: res.data.user.email,
            });
            setAlert(res.data.message);
            setOpenAlert(true);
            setSeverity("error");
            Navigate("/verify_otp");
          } else if (res.data.status === "failed") {
            setAlert(res.data.message);
            setOpenAlert(true);
            setSeverity("error");
          }
        })
        .catch((err) => console.log(err));
    } else {
      setAlert("Please Enter Email and Password");
      setOpenAlert(true);
      setSeverity("error");
    }
  };
  return (
    <div className="login-page">
      <div className="login-form">
        <div className="login">
          <h1>LOGIN</h1>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              required
              name="email"
              label="Email"
              variant="standard"
              type="email"
              color="success"
              value={email}
              onChange={handleChange("email")}
              sx={{ width: 415, m: 1 }}
            />
            <TextField
              name="password"
              label="Password"
              variant="standard"
              type="password"
              color="success"
              value={password}
              onChange={handleChange("password")}
              sx={{ width: 415, m: 1 }}
            />
          </Box>
          <p>
            Forgot Password???&nbsp;
            <Link to="/forget_password" className="_button">
              Click Here
            </Link>
            .
          </p>
          <LoadingButton
            onClick={login}
            sx={{ width: 415, m: 1 }}
            color="success"
            variant="contained"
          >
            LOGIN
          </LoadingButton>
          <Divider sx={{ width: 415, m: 1 }}>OR</Divider>
          <div className="toRegister">
            Don't have an Account??? <Link to="/register">Create One</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
