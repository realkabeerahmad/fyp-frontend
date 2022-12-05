import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import "./Medical.css";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// -------------------------------------------------------------------------

const Medical = ({ Pet, setPet }) => {
  const [values, setValues] = useState({
    _id: Pet._id,
    AppointmentDate: dayjs("2000-01-01T00:00:00"),
    address: "",
  });

  const handleChange = (value) => (e) => {
    setValues({ ...values, [value]: e.target.value });
  };

  const [date, setDate] = useState(dayjs("2019-01-20T21:11:54"));

  const handleDate = (e) => {
    setDate(e);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    values.AppointmentDate = date;
    axios
      .post("http://localhost:8000/pet/addVet", values)
      .then((res) => {
        alert(res.data.message);
        setValues({
          _id: "",
          AppointmentDate: dayjs("2000-01-01T00:00:00"),
          address: "",
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
        <h1 className="details-header-heading">Medical Details</h1>
        <Button onClick={handleOpen} color="error">
          <EditIcon />
        </Button>
      </div>
      <div className="details-more">
        {Pet.vet === undefined || Pet.vet === null || Pet.vet === {} ? (
          <div className="NA">Please Add Vet Details</div>
        ) : (
          <table>
            <tbody>
              <tr>
                <th>Next Appointment Date:</th>
                <td>
                  {Pet.vet.AppointmentDate
                    ? Pet.vet.AppointmentDate.slice(0, 10)
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <th>Vet Address:</th>
                <td>{Pet.vet.address ? Pet.vet.address : "N/A"}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="add">
          <div className="add-wrapper">
            <div className="add-top-bar">
              <h2>Edit Medical Details</h2>
              <i className="fa fa-times" onClick={handleClose}></i>
            </div>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              autoComplete="off"
            >
              <div className="add-screen">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Next Appointment Date"
                    variant="outlined"
                    name="nextDoseDate"
                    id="nextDoseDate"
                    value={date}
                    inputFormat="MM/DD/YYYY"
                    onChange={handleDate}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ width: "100%", m: 1 }}
                        color="success"
                      />
                    )}
                  />
                </LocalizationProvider>
                <TextField
                  type="text"
                  name="address"
                  id="address"
                  label="Vet Address"
                  variant="outlined"
                  color="success"
                  sx={{ width: "100%", m: 1 }}
                  onChange={handleChange("address")}
                  value={values.address}
                />

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
                  <CheckCircleIcon sx={{ mr: 1 }} />
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

export default Medical;
