import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Input,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactInputMask from "react-input-mask";
import { IMaskInput } from "react-imask";
import PropTypes from "prop-types";
// ======================================================
const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="#0000-0000000-0"
      definitions={{
        "#": /[1-9]/,
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
const AdoptApplication = ({ user, Pet, setUser }) => {
  const Navigate = useNavigate();
  // const [Age, setAge] = useState({
  //   error: false,
  //   helpr: "",
  // });
  const [values, setValues] = useState({
    petId: Pet._id,
    userId: user._id,
    dob: dayjs("2019-01-20T21:11:54"),
    cnic: user.cnic ? user.cnic : "",
    gender: user.gender ? user.gender : "",
    // gender: "",
    house_type: "",
    isYardFenced: "",
  });

  // =================================================================
  const handleChange = (value) => (e) => {
    setValues({ ...values, [value]: e.target.value });
  };

  // =================================================================
  const [date, setDate] = useState(dayjs("2019-01-20T21:11:54"));

  const handleDate = (e) => {
    setDate(e);
  };
  // =================================================================
  const handleSubmit = (e) => {
    if (user.dob) {
      setDate(user.dob);
    }
    if (
      date > dayjs("2004-01-01T00:00:00") ||
      values.isYardFenced === "" ||
      values.gender === "" ||
      values.cnic === "" ||
      values.house_type === ""
    ) {
      if (date > dayjs("2004-01-01T00:00:00")) {
        alert("Must be 18+ for adoption");
        return false;
      }
      alert("Please fill all Required Fields");
      return false;
    } else {
      const data = {
        petId: Pet._id,
        userId: user._id,
        dob: date,
        cnic: values.cnic,
        gender: values.gender,
        house_type: values.house_type,
        isYardFenced: values.isYardFenced,
      };
      axios
        .post("http://localhost:8000/adoption/adoptPet", data)
        .then((res) => {
          if (res.data.status === "failed") {
            alert(res.data.message);
            Navigate("/adopt");
          } else {
            const data = { _id: user._id };
            axios
              .post("http://localhost:8000/auth/showUser", data)
              .then((res) => {
                if (res.data.status === "success") {
                  setUser(res.data.user);
                } else {
                  alert("User not Updated");
                }
              });
            setValues({
              petId: Pet._id,
              userId: user._id,
              dob: dayjs("2019-01-20T21:11:54"),
              cnic: "",
              gender: "",
              house_type: "",
              isYardFenced: "",
            });
            alert(res.data.message);
            Navigate("/adopt");
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 70px)",
      }}
    >
      <Link
        to="/adopt"
        style={{
          color: "#e92e4a",
          fontSize: 25,
          position: "absolute",
          top: 10,
          left: 10,
        }}
      >
        <i className="fa fa-arrow-left"></i>
      </Link>
      <Box sx={{ width: "80%" }}>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          autoComplete="off"
        >
          <h1 style={{ color: "#e92e4a", textAlign: "center" }}>
            Pet Adoption Application
          </h1>
          <div className="adoption-application">
            <div>
              <TextField
                label="Pet Name"
                variant="standard"
                color="success"
                sx={{ width: "45%", m: 1 }}
                name="name"
                type="text"
                value={Pet.name}
                disabled
                required
              />
              <TextField
                label="User Name"
                variant="standard"
                color="success"
                sx={{ width: "45%", m: 1 }}
                name="name"
                type="text"
                value={user.name}
                disabled
                required
              />
            </div>
            <div>
              <TextField
                label="User Email"
                variant="standard"
                color="success"
                sx={{ width: "45%", m: 1 }}
                name="name"
                type="text"
                value={user.email}
                disabled
                required
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="User Date of Birth"
                  variant="standard"
                  color="success"
                  name="dob"
                  value={user.dob ? user.dob : date}
                  inputFormat="MM/DD/YYYY"
                  onChange={handleDate}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ width: "45%", m: 1 }}
                      variant="standard"
                      color="success"
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div>
              <FormControl sx={{ width: "45%", m: 1 }}>
                <InputLabel id="gender" color="success">
                  User Gender
                </InputLabel>
                <Select
                  label="User Gender"
                  name="gender"
                  id="gender"
                  variant="standard"
                  color="success"
                  // sx={{ width: "84%", m: 1 }}
                  value={user.gender ? user.gender : values.gender}
                  onChange={handleChange("gender")}
                  required
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
              {/* <TextField
                label="User Age"
                variant="standard"
                color="success"
                sx={{ width: "45%", m: 1 }}
                name="name"
                type="text"
                value={user.age ? user.age : values.age}
                // disabled
                required
              /> */}

              <FormControl color="success" sx={{ width: "45%", m: 1 }}>
                <InputLabel htmlFor="formatted-text-mask-input">
                  User CNIC Number
                </InputLabel>
                <Input
                  variant="standard"
                  value={user.cnic ? user.cnic : values.cnic}
                  onChange={handleChange("cnic")}
                  name="textmask"
                  id="formatted-text-mask-input"
                  inputComponent={TextMaskCustom}
                  // disabled={user.cnic ? true : false}
                />
              </FormControl>
              {/* <TextField
                label="User CNIC"
                variant="standard"
                color="success"
                sx={{ width: "45%", m: 1 }}
                name="name"
                type="text"
                value={user.cnic ? user.cnic : values.cnin}
                onChange={handleChange("cnic")}
                // disabled
                required
              ></TextField> */}
              {/* <ReactInputMask
                mask="99999-9999999-9"
                maskChar=" "
                value={user.cnic ? user.cnic : values.cnin}
                onChange={handleChange("cnic")}
              />
              <ReactInputMask mask="0399-9999999" maskChar=" " /> */}
            </div>
            <div>
              <FormControl sx={{ width: "45%", m: 1 }}>
                <InputLabel id="house-type" color="success">
                  User House Type
                </InputLabel>
                <Select
                  label="User House Type"
                  name="house-type"
                  id="house-type"
                  variant="standard"
                  color="success"
                  // sx={{ width: "84%", m: 1 }}
                  value={values.house_type}
                  onChange={handleChange("house_type")}
                  required
                >
                  <MenuItem value="Own">Own</MenuItem>
                  <MenuItem value="Rent">Rent</MenuItem>
                  <MenuItem value="Shared">Shared</MenuItem>
                </Select>
              </FormControl>
              <FormControl component="fieldset" sx={{ width: "45%", m: 1 }}>
                <FormLabel color="success">Is Yard Fenced</FormLabel>
                <RadioGroup
                  name="spacing"
                  aria-label="spacing"
                  color="success"
                  value={values.isYardFenced}
                  onChange={handleChange("isYardFenced")}
                  row
                >
                  {["Yes", "No"].map((value) => (
                    <FormControlLabel
                      key={value}
                      color="success"
                      value={value.toString()}
                      control={<Radio color="success" />}
                      label={value.toString()}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="success"
                sx={{ width: "45%", m: 1 }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </div>
        </form>
      </Box>
    </Box>
  );
};

export default AdoptApplication;
