import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import GalleryImage from "../GalleryImage/GalleryImage";
import "./Gallery.css";
import axios from "axios";
import { Box, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// --------------------------------------------------------

const Gallery = ({ Pet, setPet }) => {
  const [values, setValues] = useState({
    _id: "",
    image: "",
  });
  const [open, setOpen] = useState(false);
  const [_image, setimage] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setimage();
    setOpen(false);
  };
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
    const formData = new FormData();
    formData.append("_id", Pet._id);
    formData.append("image", values.image);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post("http://localhost:8000/pet/addImage", formData, config)
      .then((res) => {
        alert(res.data.message);
        handleClose();
        setValues({
          _id: "",
          image: "",
        });
        const data = { _id: Pet._id };
        axios
          .post("http://localhost:8000/pet/showPet", data)
          .then((r) => {
            setPet(r.data.pet);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <div className="details-about-pet">
        <div className="details-header">
          <p className="details-header-heading">
            <b>GALLERY</b>
          </p>
          <Button onClick={handleOpen} color="error">
            <AddCircleIcon sx={{ color: "#e92e4a" }} />
          </Button>
        </div>
        <div className="gallery-wrapper">
          <div className="gallery-main">
            {Pet.gallery.map((Image) => {
              return <GalleryImage Image={Image} Pet={Pet} setPet={setPet} />;
            })}
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="add">
          <div className="add-wrapper">
            <div className="add-top-bar">
              <h2>Add Image</h2>
              <i className="fa fa-times" onClick={handleClose}></i>
            </div>
            <div className="add-screen">
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                autoComplete="off"
              >
                <Box className="add-image" sx={{}}>
                  <img src={_image} alt="" />
                  <label className="custom-file-upload" htmlFor="image-upload">
                    <AddCircleIcon sx={{ fontSize: 80 }} />
                    <input
                      id="image-upload"
                      type="file"
                      name="image-upload"
                      accept=".png, .jpg, .jpeg"
                      onChange={handleImage}
                    />
                  </label>
                </Box>
                <Button
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
                  <CheckCircleIcon sx={{ mr: 1 }} />
                  SAVE
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Gallery;
