import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import "./AddPet.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CheckCircle } from "@mui/icons-material";
import { catBreeds, dogBreeds, parrotBreed, rabbitBreed } from "./breeds";
import { IMaskInput } from "react-imask";
import PropTypes from "prop-types";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// ======================================================
const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="PK#0000-0"
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
// --------------------------------------------------------------------
const AddPet = ({ user }) => {
  // --------------------------------------------------------------------
  // --------------------------------------------------------------------
  // --------------------------------------------------------------------
  const Navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [values, setValues] = useState({
    userId: "",
    name: "",
    bio: "",
    age: "",
    gender: "",
    breed: "",
    type: "",
    image: "",
    passport: "",
  });

  const [breedArr, SetBreedArr] = useState([
    { label: "Other", value: "Other" },
  ]);
  const handleChange = (value) => (e) => {
    setValues({ ...values, [value]: e.target.value });
  };
  const onBlur = (e) => {
    if (values.type === "Cat") {
      SetBreedArr(catBreeds);
    } else if (values.type === "Dog") {
      SetBreedArr(dogBreeds);
    } else if (values.type === "Parrot") {
      SetBreedArr(parrotBreed);
    } else if (values.type === "Horse") {
    } else if (values.type === "Hen") {
    } else if (values.type === "Rabbit") {
      SetBreedArr(rabbitBreed);
    }
  };
  const [_image, setimage] = useState();

  const handleImage = (e) => {
    setValues({ ...values, image: e.target.files[0] });
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setimage(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.image) {
      alert("Please Add an Image");
      return false;
    } else {
      const storageRef = ref(storage, `files/${values.image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, values.image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
          });
        }
      );
      console.log(imgUrl);
      if (imgUrl === null) return;
      const formData = {
        userId: user._id,
        image: imgUrl,
        name: values.name,
        bio: values.bio,
        age: values.age,
        gender: values.gender,
        breed: values.breed,
        type: values.type,
        passport: values.passport,
        age: values.age,
      };
      axios
        .post("http://localhost:8000/pet/add", formData)
        .then((res) => {
          alert(res.data.message);
          setValues({
            userId: "",
            name: "",
            bio: "",
            gender: "",
            breed: "",
            type: "",
            image: "",
            passport: "",
            age: "",
          });
          Navigate("/my_pets");
        })
        .catch((err) => {
          // alert(err.data.message);
          alert(err);
        });
    }
  };

  // --------------------------------------------------------------------
  // --------------------------------------------------------------------
  // --------------------------------------------------------------------
  // --------------------------------------------------------------------
  return (
    <Box
      className="add-pet-form"
      sx={{
        backgroundColor: "white",
        width: "100%",
        height: "calc(100vh - 72px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Link to="/my_pets">
        <i className="fa fa-arrow-left"></i>
      </Link>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        autoComplete="off"
      >
        <h1>Add Pet</h1>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "20%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="add-image-1">
              <img src={_image} alt="" />
              <label className="custom-file-upload" htmlFor="image-upload">
                <i className="fa fa-plus"></i>
                <input
                  id="image-upload"
                  type="file"
                  name="image-upload"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleImage}
                />
              </label>
            </div>
          </Box>
          <Box
            sx={{
              width: "80%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                label="User Id"
                variant="standard"
                color="success"
                name="userId"
                type="password"
                value={user._id}
                disabled
                required
                sx={{ width: "40%", m: 1 }}
              />
              <TextField
                label="Pet Name"
                variant="standard"
                color="success"
                sx={{ width: "40%", m: 1 }}
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange("name")}
                required
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl
                variant="standard"
                color="success"
                sx={{ width: "40%", m: 1 }}
              >
                <InputLabel htmlFor="formatted-text-mask-input">
                  Pet Passport Number (Optional)
                </InputLabel>
                <Input
                  variant="standard"
                  value={values.passport}
                  onChange={handleChange("passport")}
                  name="textmask"
                  id="formatted-text-mask-input"
                  inputComponent={TextMaskCustom}
                />
                <Box sx={{ fontSize: 12, color: "GrayText" }}>
                  Formate (PK00000-0)
                </Box>
              </FormControl>
              <FormControl variant="standard" sx={{ width: "40%", m: 1 }}>
                <InputLabel id="gender" color="success">
                  Gender *
                </InputLabel>
                <Select
                  label="Gender *"
                  name="gender"
                  id="gender"
                  color="success"
                  variant="standard"
                  value={values.gender}
                  onChange={handleChange("gender")}
                  required
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl variant="standard" sx={{ width: "40%", m: 1 }}>
                <InputLabel id="type" color="success">
                  Pet Type *
                </InputLabel>
                <Select
                  label="Type *"
                  id="type"
                  color="success"
                  variant="standard"
                  name="type"
                  type="text"
                  value={values.type}
                  onChange={handleChange("type")}
                  onBlur={onBlur}
                  required
                >
                  <MenuItem value="Cat">Cat</MenuItem>
                  <MenuItem value="Dog">Dog</MenuItem>
                  {/* <MenuItem value="Horse">Horse</MenuItem> */}
                  <MenuItem value="Parrot">Parrot</MenuItem>
                  {/* <MenuItem value="Hen">Hen</MenuItem> */}
                  <MenuItem value="Rabbit">Rabbit</MenuItem>
                </Select>
              </FormControl>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={breedArr}
                getOptionSelected={(option, value) =>
                  console.log(option, value)
                }
                color="success"
                disableClearable
                value={values.breed}
                onChange={handleChange("breed")}
                sx={{ width: "40%", m: 1 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Breed"
                    variant="standard"
                    color="success"
                    required
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl variant="standard" sx={{ width: "40%", m: 1 }}>
                <InputLabel id="type" color="success">
                  Pet Age *
                </InputLabel>
                <Select
                  label="Age *"
                  id="age"
                  color="success"
                  variant="standard"
                  name="type"
                  type="text"
                  value={values.age}
                  onChange={handleChange("age")}
                  onBlur={onBlur}
                  required
                >
                  <MenuItem value="0 Months">0 Month</MenuItem>
                  <MenuItem value="1 Month">1 Month</MenuItem>
                  <MenuItem value="2 Months">2 Months</MenuItem>
                  <MenuItem value="3 Months">3 Months</MenuItem>
                  <MenuItem value="4 Months">4 Months</MenuItem>
                  <MenuItem value="5 Months">5 Months</MenuItem>
                  <MenuItem value="6 Months">6 Months</MenuItem>
                  <MenuItem value="7 Months">7 Months</MenuItem>
                  <MenuItem value="8 Months">8 Months</MenuItem>
                  <MenuItem value="9 Months">9 Months</MenuItem>
                  <MenuItem value="10 Months">10 Months</MenuItem>
                  <MenuItem value="11 Months">11 Months</MenuItem>
                  <MenuItem value="1 Year">1 Year</MenuItem>
                  <MenuItem value="2 Years">2 Years</MenuItem>
                  <MenuItem value="3 Years">3 Years</MenuItem>
                  <MenuItem value="4 Years">4 Years</MenuItem>
                  <MenuItem value="5 Years">5 Years</MenuItem>
                  <MenuItem value="6 Years">6 Years</MenuItem>
                  <MenuItem value="7 Years">7 Years</MenuItem>
                  <MenuItem value="8 Years">8 Years</MenuItem>
                  <MenuItem value="9 Years">9 Years</MenuItem>
                  <MenuItem value="10 Years">10 Years</MenuItem>
                  <MenuItem value="11 Years">11 Years</MenuItem>
                  <MenuItem value="12 Years">12 Years</MenuItem>
                  <MenuItem value="13 Years">13 Years</MenuItem>
                  <MenuItem value="14 Years">14 Years</MenuItem>
                  <MenuItem value="15 Years">15 Years</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Pet Bio"
                variant="standard"
                color="success"
                sx={{ width: "40%", m: 1 }}
                name="bio"
                type="text"
                value={values.bio}
                onChange={handleChange("bio")}
                required
                helperText="Maximum 50 word"
              />
            </Box>
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
                sx={{ width: "40%", m: 1, fontSize: 18 }}
                type="submit"
              >
                <CheckCircle
                  sx={{
                    mr: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddPet;
