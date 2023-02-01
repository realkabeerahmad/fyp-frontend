import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import "./GalleryImage.css";
import axios from "axios";
import { Close, Delete, Share } from "@mui/icons-material";
import { Box } from "@mui/material";
import url from "../../apiCalls/api";

const GalleryImage = ({ Image, Pet, setPet, user }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteImage = () => {
    const data = { _id: Pet._id, imageId: Image._id };
    axios
      .post(url + "/pet/gallery/delete", data)
      .then((res) => {
        alert(res.data.message);
        handleClose();
        axios
          .post(url + "/pet/show", data)
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
  const share = () => {
    const data = {
      userId: user._id,
      content: "See My Pet's Image to make your day :)",
      Image: Image.image,
    };
    axios.post(url + "/community/post", data).then((res) => {
      alert(res.data.message);
      // handleClose()
    });
  };
  return (
    <div>
      <div className="gallery-image" onClick={handleOpen}>
        <img src={Image.image} alt="" />
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="gallery-image-zoom">
          <div className="gallery-image-zoom-wrapper">
            <Box
              className="gallery-image-zoom-header"
              sx={{ borderBottom: "1px solid #c2c2c2" }}>
              <button className="delete-btn-l" onClick={share}>
                <Share />
              </button>
              <button className="delete-btn-l" onClick={deleteImage}>
                <Delete />
              </button>
              <button onClick={handleClose}>
                <Close />
              </button>
            </Box>
            <Box
              className="gallery-image-zoom-img"
              sx={{ backgroundColor: "white", contain: "content" }}>
              <img src={Image.image} alt="" />
            </Box>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GalleryImage;
