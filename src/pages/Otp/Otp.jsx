import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IMaskInput } from "react-imask";
import PropTypes from "prop-types";

// --------------------------------------------------------------------
// --------------------------------------------------------------------
// ======================================================
const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="#000"
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

const Otp = ({
  userDetails,
  setAlert,
  setOpenAlert,
  setSeverity,
  setUserDetails,
}) => {
  // const [disabled,setDisabled] = useState(false);
  const Navigate = useNavigate();
  const [values, setvalues] = useState({
    otp: "",
    userID: userDetails.userId,
    email: userDetails.email,
  });
  const handleChange = (value) => (e) => {
    setvalues({ ...values, [value]: e.target.value });
    if (values.otp.length == 4) {
      return false;
    }
  };
  const [disabled, setdisabled] = useState(true);
  // var [seconds, setSeconds] = useState(30);

  const Re_Send = () => {
    setdisabled("true");
    axios
      .post("http://localhost:8000/auth/reSendOtpVerificatioCode", values)
      .then((res) => {
        alert(res.data.message);
        setUserDetails({ userId: res.data.userId, email: res.data.email });
      })
      .catch((err) => {
        console.log(err);
      });
    // setSeconds(30);
    // for (let i = 0; i < 30; i++) {
    //   setTimeout(() => {
    //     setSeconds(seconds - 1);
    //   }, 1000);
    // }
  };
  setTimeout(() => {
    setdisabled(false);
  }, 30000);
  const { otp } = values;
  const verify_otp = () => {
    const { otp } = values;
    const data = { otp: otp, userID: userDetails.userId };
    if (data) {
      axios
        .post("http://localhost:8000/auth/verifyOTP", data)
        .then((res) => {
          if (res.data.status === "success") {
            setOpenAlert(false);
            setAlert("Email Verified Successfully");
            setSeverity("success");
            Navigate("/login");
            setOpenAlert(true);
            setUserDetails({});
          } else if (res.data.status === "failed") {
            setOpenAlert(false);
            setAlert(res.data.message);
            setSeverity("error");
            setOpenAlert(true);
          }
        })
        .catch((err) => {
          console.log("I will here");
          console.log(err);
        });
    } else {
      setAlert("Please Enter Required details");
      setSeverity("error");
      setOpenAlert(true);
    }
  };
  return (
    <div className="login-page">
      <div className="login-form">
        <div className="login">
          <h1>VERIFY EMAIL</h1>
          <Box component="form" noValidate autoComplete="off">
            <FormControl
              variant="standard"
              color="success"
              sx={{ width: 415, m: 1, textAlign: "center" }}
            >
              <InputLabel htmlFor="formatted-text-mask-input">OTP</InputLabel>
              <Input
                sx={{ textAlign: "center" }}
                variant="standard"
                value={values.otp}
                onChange={handleChange("otp")}
                name="textmask"
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom}
              />
            </FormControl>
          </Box>
          <Button sx={{ m: 1 }} onClick={Re_Send} disabled={disabled}>
            Re-Send OTP
          </Button>
          {/* {seconds} */}
          <Button
            sx={{ width: 415, m: 1 }}
            variant="contained"
            color="success"
            onClick={verify_otp}
          >
            VERIFY
          </Button>
          {/* <div className="toRegister otp_timmer">
            <button disabled={disabled} onClick={Re_Send}>
              Re-Send OTP
            </button>{" "}
            {seconds <= 0 ? <></> : <span> after {seconds} seconds</span>}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Otp;
