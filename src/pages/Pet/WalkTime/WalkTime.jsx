import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import Time from "../../../components/Time/Time";
import axios from "axios";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, TextField } from "@mui/material";
import dayjs from "dayjs";
import { AddCircle, CheckCircle } from "@mui/icons-material";
//------------------------------------------------
const WalkTime = ({ Pet, setPet }) => {
  const [values, setValues] = useState({
    _id: Pet._id,
    name: "",
    time: dayjs("2019-01-20T21:11:54"),
  });

  const handleChange = (value) => (e) => {
    setValues({ ...values, [value]: e.target.value });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [time, setTime] = useState(dayjs("2019-01-20T21:11:54"));

  const handleTime = (e) => {
    setTime(e);
  };

  const handleSubmit = () => {
    // e.preventDefault();
    values._id = Pet._id;
    values.time = time;
    axios
      .post("http://localhost:8000/pet/addWalkTime", values)
      .then((res) => {
        alert(res.data.message);
        setValues({
          name: "",
          time: "",
        });
        handleClose();
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
    <div className="details-about-pet">
      <div className="details-header">
        <p className="details-header-heading">
          <b>Walk Time</b>
        </p>
        <Button onClick={handleOpen} color="error">
          <AddCircle />
        </Button>
      </div>
      <div className="details-more">
        {Pet.walkTimes === [] ||
        Pet.walkTimes === undefined ||
        Pet.walkTimes === null ? (
          <div className="NA">ADD WALK TIME PLEASE</div>
        ) : (
          Pet.walkTimes.map((time) => {
            return (
              <Time time={time} Pet={Pet} setPet={setPet} timeName={"walk"} />
            );
          })
        )}
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="add">
          <div className="add-wrapper">
            <div className="add-top-bar">
              <h2>Add Walk Time</h2>
              <i className="fa fa-times" onClick={handleClose}></i>
            </div>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              autoComplete="off"
            >
              <div className="add-screen">
                <TextField
                  name="time-name"
                  id="time-name"
                  label="Time Name"
                  variant="outlined"
                  color="success"
                  sx={{ width: "100%", p: 0, m: 1 }}
                  type="text"
                  value={values.name}
                  onChange={handleChange("name")}
                  required
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Time"
                    variant="outlined"
                    color="success"
                    name="time"
                    value={time}
                    onChange={handleTime}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ width: "100%", p: 0, m: 1 }}
                        variant="outlined"
                        color="success"
                        required
                      />
                    )}
                  />
                </LocalizationProvider>
                <Button
                  className="save-btn"
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
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WalkTime;
