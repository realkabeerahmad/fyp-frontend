import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import "./GalleryImage.css";
import axios from "axios";
import { Close, Delete } from "@mui/icons-material";
import { Box } from "@mui/material";

const GalleryImage = ({ Image, Pet, setPet }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteImage = () => {
    const data = { _id: Pet._id, imageId: Image._id };
    axios
      .post("http://localhost:8000/pet/deleteImage", data)
      .then((res) => {
        alert(res.data.message);
        handleClose();
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
    <div>
      <div className="gallery-image" onClick={handleOpen}>
        <img src={"http://localhost:8000/" + Image.image} alt="" />
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="gallery-image-zoom">
          <div className="gallery-image-zoom-wrapper">
            <Box
              className="gallery-image-zoom-header"
              sx={{ borderBottom: "1px solid #c2c2c2" }}
            >
              <button className="delete-btn-l" onClick={deleteImage}>
                <Delete />
              </button>
              <button onClick={handleClose}>
                <Close />
              </button>
            </Box>
            <Box
              className="gallery-image-zoom-img"
              sx={{ backgroundColor: "white" }}
            >
              <img src={"http://localhost:8000/" + Image.image} alt="" />
            </Box>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GalleryImage;
