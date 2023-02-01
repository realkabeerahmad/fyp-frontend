import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import GalleryImage from "../GalleryImage/GalleryImage";
import "./Gallery.css";
import axios from "axios";
import { Box, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { LoadingButton } from "@mui/lab";
import url from "../../apiCalls/api";
// --------------------------------------------------------

const Gallery = ({ Pet, setPet,user }) => {
  const [values, setValues] = useState({
    _id: "",
    image: "",
  });
  const [open, setOpen] = useState(false);
  const [_image, setimage] = useState();
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
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
          setLoading(false);
        });
      }
    );
    console.log(imgUrl);
    if (imgUrl === null) return;
    const formData = { _id: Pet._id, image: imgUrl };
    axios
      .post(url + "/pet/gallery/add", formData)
      .then((res) => {
        alert(res.data.message);
        handleClose();
        setValues({
          _id: "",
          image: "",
        });
        const data = { _id: Pet._id };
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
              return <GalleryImage Image={Image} Pet={Pet} setPet={setPet} user={ user} />;
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
                <LoadingButton
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
                  loading={loading}
                >
                  <CheckCircleIcon sx={{ mr: 1 }} />
                  SAVE
                </LoadingButton>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Gallery;
