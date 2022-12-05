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
import { Button } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

// --------------------------------------------------

const Details = ({ user, Pet }) => {
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [breedArr, SetBreedArr] = useState([{ label: "Other" }]);

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

  const [date, setDate] = useState(dayjs("2019-01-20T21:11:54"));

  const handleDate = (e) => {
    setDate(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.image) {
      alert("Please Add an Image");
      return false;
    } else {
      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("image", values.image);
      formData.append("name", values.name);
      formData.append("bio", values.bio);
      formData.append("age", values.age);
      formData.append("gender", values.gender);
      formData.append("breed", values.breed);
      formData.append("type", values.type);
      formData.append("passport", values.passport);
      formData.append("dob", date);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post("http://localhost:8000/pet/addPet", formData, config)
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
            dob: "",
          });
        })
        .catch((err) => {
          // alert(err.data.message);
          alert(err);
        });
    }
  };

  return (
    <div className="details-about-pet">
      <div className="details-header">
        <p className="details-header-heading">
          <b>DETAILS</b>
        </p>
        <Button onClick={handleOpen} color="error">
          <EditIcon />
        </Button>
      </div>
      <div className="details-more">
        <table>
          <tbody>
            <tr>
              <th>Type:</th>
              <td>{Pet.type}</td>
            </tr>
            <tr>
              <th>Breed:</th>
              <td>{Pet.breed}</td>
            </tr>
            <tr>
              <th>Gender:</th>
              <td>{Pet.gender}</td>
            </tr>
            <tr>
              <th>Date of Birth:</th>
              <td>{Pet.dob.slice(0, 10)}</td>
            </tr>
            <tr>
              <th>Passport Number:</th>
              <td>{Pet.passport}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="add">
          <div className="add-wrapper">
            <div className="add-top-bar">
              <h2>Edit Vaccination Details</h2>
              <i className="fa fa-times" onClick={handleClose}></i>
            </div>

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
            >
              <CheckCircle sx={{ mr: 1 }} />
              SAVE
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Details;
