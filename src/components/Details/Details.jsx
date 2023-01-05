import React, { useState } from "react";
import "./Details.css";
import axios from "axios";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import {
  catBreeds,
  dogBreeds,
  parrotBreed,
  rabbitBreed,
} from "../../pages/AddPet/breeds";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { CheckCircle, Close, Redo, Undo } from "@mui/icons-material";

import { IMaskInput } from "react-imask";
import PropTypes from "prop-types";
import url from "../../apiCalls/api";

// ======================================================
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
// --------------------------------------------------

const Details = ({ user, Pet, setPet }) => {
  const [breedArr, SetBreedArr] = useState(
    Pet.type === "Cat"
      ? catBreeds
      : Pet.type === "Dog"
      ? dogBreeds
      : Pet.type === "Parrot"
      ? parrotBreed
      : Pet.type === "Rabit"
      ? rabbitBreed
      : [{ label: "Other", value: "Other" }]
  );
  const [values, setValues] = useState({
    _id: Pet._id,
    age: Pet.age,
    bio: Pet.bio,
    gender: Pet.gender,
    passport: Pet.passport,
  });
  const [Breed, setBreed] = React.useState(Pet.breed);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setValues({
      _id: Pet._id,
      age: Pet.age,
      bio: Pet.bio,
      gender: Pet.gender,
      passport: Pet.passport,
    });
    setBreed(Pet.breed);
    setOpen(false);
  };

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
    if (!values.gender || !values.bio || !values.age || !Breed) {
      alert("Please add all required details");
      return false;
    } else {
      const formData = {
        _id: values._id,
        age: values.age,
        bio: values.bio,
        gender: values.gender,
        breed: Breed,
        passport: values.passport,
      };
      axios
        .post(url + "/pet/edit", formData)
        .then((res) => {
          if (res.data.status === "success") {
            const data = { _id: Pet._id };
            axios.post(url + "/pet/show", data).then((res) => {
              if (res.data.status === "success") {
                setPet(res.data.pet);
                handleClose();
              } else {
                alert("Data not Found");
              }
            });
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const rehome = () => {
    const data = { _id: Pet._id };
    axios
      .post(url + "/pet/rehome", data)
      .then((res) => {
        if (res.data.status === "success") {
          setPet(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const undoRehome = () => {
    const data = { _id: Pet._id };
    axios
      .post(url + "/pet/rehome/undo", data)
      .then((res) => {
        if (res.data.status === "success") {
          setPet(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="details-about-pet">
      <div className="details-header">
        <p className="details-header-heading">
          <b>DETAILS</b>
        </p>
        <Box>
          {!Pet.rehome && user.isShelter ? (
            <Button
              onClick={rehome}
              color="error"
              // variant="contained"
              sx={{ fontSize: 12, mr: 1 }}
            >
              <Redo sx={{ mr: 1, fontSize: 13 }} /> Rehome
            </Button>
          ) : Pet.rehome && user.isShelter ? (
            <Button
              onClick={undoRehome}
              color="error"
              // variant="contained"
              sx={{ fontSize: 12, mr: 1 }}
            >
              Undo Rehome
            </Button>
          ) : (
            <></>
          )}
          <IconButton onClick={handleOpen} color="error">
            <EditIcon />
          </IconButton>
        </Box>
      </div>
      <Box sx={{ width: "100%" }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#2f2f2f" }}>
                Type:
              </TableCell>
              <TableCell>{Pet.type}</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#2f2f2f" }}>
                Breed:
              </TableCell>
              <TableCell>{Pet.breed}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#2f2f2f" }}>
                Gender:
              </TableCell>
              <TableCell>{Pet.gender}</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#2f2f2f" }}>
                Age:
              </TableCell>
              <TableCell>{Pet.age}</TableCell>
            </TableRow>

            {Pet.passport ? (
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: "#2f2f2f" }}>
                  Passport Number:
                </TableCell>
                <TableCell>{Pet.passport}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <div className="add">
          <Box
            sx={{
              width: 500,
              height: "90%",
              borderRadius: 2,
              backgroundColor: "white",
              contain: "content",
            }}
          >
            <div className="add-top-bar">
              <h2>Edit Vaccination Details</h2>
              <IconButton
                onClick={handleClose}
                sx={{ position: "absolute", top: 5, right: 10 }}
              >
                <Close />
              </IconButton>
            </div>
            <Box sx={{ width: "100%", p: 2 }}>
              <TextField
                label="Pet Bio"
                variant="standard"
                color="success"
                sx={{ width: "100%", my: 1 }}
                name="bio"
                type="text"
                value={values.bio}
                onChange={handleChange("bio")}
                required
                helperText="Maximum 100 characters"
              />
              <FormControl
                variant="standard"
                color="success"
                sx={{ width: "100%", my: 1 }}
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
              <FormControl variant="standard" sx={{ width: "100%", my: 1 }}>
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
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={breedArr}
                getOptionSelected={(option, value) =>
                  console.log(option, value)
                }
                color="success"
                disableClearable
                value={Breed}
                onChange={(event, value) => {
                  setBreed(value);
                }}
                sx={{ width: "100%", my: 1 }}
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
              <FormControl variant="standard" sx={{ width: "100%", my: 1 }}>
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
            </Box>
            <Button
              type="submit"
              color="success"
              fullWidth
              variant="contained"
              sx={{
                width: "100%",
                position: "absolute",
                bottom: 0,
                fontSize: 18,
              }}
              onClick={handleSubmit}
            >
              <CheckCircle sx={{ mr: 1 }} />
              SAVE
            </Button>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default Details;
