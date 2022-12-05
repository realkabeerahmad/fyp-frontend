import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Notifications } from "@mui/icons-material";

// --------------------------------------------------

const Time = ({ Pet, setPet, time, timeName }) => {
  console.log(timeName);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteTime = () => {
    const data = { _id: Pet._id, timeId: time._id };
    var url = "";
    if (timeName === "meal") {
      url = "http://localhost:8000/pet/deleteMealTime";
    } else if (timeName === "walk") {
      url = "http://localhost:8000/pet/deleteWalkTime";
    }
    axios
      .post(url, data)
      .then((res) => {
        alert(res.data.message);
        // handleClose();
        axios
          .post("http://localhost:8000/pet/showPet", data)
          .then((r) => {
            setPet(r.data.pet);
            handleClose();
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        mb: 2,
        p: 1,
        borderBottom: "1px solid #c2c2c2",
      }}
    >
      <Box sx={{ width: "33%", fontWeight: 500 }}>
        {time.name.toUpperCase()}:
      </Box>
      <Box sx={{ width: "33%" }}>{String(time.time).slice(11, 16)}</Box>
      <Button onClick={false} color="error">
        <Notifications />
      </Button>
      <Button onClick={handleClickOpen} color="error">
        <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to Delete the Time.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancle</Button>
          <Button onClick={deleteTime} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Time;
