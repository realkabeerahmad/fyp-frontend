import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgetPass = ({
  setAlert,
  setOpenAlert,
  setSeverity,
  setUserDetails,
}) => {
  const Navigate = useNavigate();
  return (
    <div className="login-page">
      <div className="login-form">
        <div className="login">
          <h1>FORGOT PASSWORD</h1>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              name="Email"
              label="Email"
              variant="outlined"
              type="email"
              color="success"
              sx={{ width: 415, m: 1 }}
            />
          </Box>
          <div className="button" onClick={() => Navigate("/verify_otp")}>
            SEND OTP
          </div>
          <div> or </div>
          <div className="toRegister">
            Remeber Password??? <Link to="/login">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
