import { Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// --------------------------------------------
// --------------------------------------------
// --------------------------------------------
const User = ({ user, setUser }) => {
  // --------------------------------------------
  // --------------------------------------------
  // --------------------------------------------
  const [open, setOpen] = useState(false);
  const [images, setFile] = useState();
  const [imgUrl, setImgUrl] = useState(null);
  const [fileData, setFileData] = useState();
  const [values, setValues] = useState({
    userId: "",
    image: "",
  });
  const [progresspercent, setProgresspercent] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setimage();
  };

  const [_image, setimage] = useState();

  const handleImage = (e) => {
    setValues({ ...values, image: e.target.files[0] });
    setFileData(e.target.files[0]);
    // setFile(URL.createObjectURL(e.target.files));
    // console.log(e.target.files[0].size);
    // console.log(URL.createObjectURL(e.target.files[0]));
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setimage(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const file = e.target[0]?.files[0]
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
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
          });
        }
      );
      const img = Object.assign(values.image, { path: images });
      console.log(img);

      // const formData = new FormData();
      const data = { userId: user._id, url: imgUrl };
      // formData.append("path", images);
      // const config = {
      //   headers: { "content-type": "multipart/form-data" },
      // };
      axios
        .post("http://localhost:8000/auth/updateProfileImage", data)
        .then((res) => {
          alert(res.data.message);
          setValues({
            userId: "",
            image: "",
          });
          const data = { _id: user._id };
          axios
            .post("http://localhost:8000/auth/showUser", data)
            .then((res) => {
              alert(res.data.message);
              setUser(res.data.user);
              handleClose();
            })
            .catch((err) => {
              alert(err);
            });
        })
        .catch((err) => {
          // alert(err.data.message);
          alert(err);
        });
    }
  };
  // --------------------------------------------
  // --------------------------------------------
  // --------------------------------------------
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 72px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "80%",
          p: 6,
          backgroundColor: "white",
          display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "50%",
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              width: "150px",
              height: "150px",
              borderRadius: 2,
              position: "relative",
              // contain: "content",
            }}
          >
            <Box
              sx={{
                width: "150px",
                height: "150px",
                borderRadius: 2,
                contain: "content",
                mb: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={user.Image} style={{ height: "150px" }} />
            </Box>
            <Button
              variant="contained"
              color="error"
              sx={{
                width: "100%",
                // position: "absolute",
                // bottom: 0,
                // right: 0,
              }}
              onClick={handleClickOpen}
            >
              <Edit sx={{ fontSize: 15 }} />
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: "50%",
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <th>First Name:</th>
                <td>{user.firstName}</td>
                <td></td>
              </tr>
              <tr>
                <th>Last Name:</th>
                <td>{user.lastName}</td>
                <td></td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{user.email}</td>
                <td></td>
              </tr>
              {user.cnic ? (
                <tr>
                  <th>CNIC:</th>
                  <td>{user.cnic}</td>
                  <td></td>
                </tr>
              ) : (
                <></>
              )}
              {user.dob ? (
                <tr>
                  <th>DOB:</th>
                  <td>{user.dob.slice(0, 10)}</td>
                  <td></td>
                </tr>
              ) : (
                <></>
              )}
              {user.gender ? (
                <tr>
                  <th>Gender:</th>
                  <td>{user.gender}</td>
                  <td></td>
                </tr>
              ) : (
                <></>
              )}
              <tr>
                <th>Password:</th>
                <td>*********</td>
                <td>
                  {/* <Button color="error">
                    <Edit sx={{ fontSize: 15 }} />
                  </Button> */}
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Box>
      {/* ------------------------------------------------ */}
      {/* ------------------------------------------------ */}
      {/* ------------------------------------------------ */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Profile Picture</DialogTitle>
        <DialogContent>
          <DialogContentText>Select an Image.</DialogContentText>
          <div className="add-image-1">
            <img src={_image} alt="" />
            <label className="custom-file-upload" htmlFor="image-upload">
              <i className="fa fa-plus"></i>
              <input
                id="image-upload"
                type="file"
                name="image-upload"
                // value={images}
                accept=".png, .jpg, .jpeg"
                onChange={handleImage}
              />
            </label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default User;
