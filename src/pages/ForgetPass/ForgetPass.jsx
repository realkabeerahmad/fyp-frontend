import { Button, Divider, TextField } from "@mui/material";
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
              variant="standard"
              type="email"
              color="success"
              sx={{ width: 415, m: 1 }}
            />
          </Box>
          <Button
            onClick={() => Navigate("/verify_otp")}
            variant="contained"
            sx={{ width: 415, m: 1 }}
            color="success"
          >
            SEND OTP
          </Button>
          <Divider sx={{ width: 415, m: 1 }}>OR</Divider>
          <div className="toRegister">
            Remeber Password??? <Link to="/login">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
