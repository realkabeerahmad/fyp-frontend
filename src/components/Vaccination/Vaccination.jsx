import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import "./Vaccination.css";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// -------------------------------------------------------------------------

const Vaccination = ({ Pet, setPet }) => {
  const [values, setValues] = useState({
    _id: Pet._id,
    DoseDate: dayjs("2000-01-01T00:00:00"),
    address: "",
    status: true,
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
    values.DoseDate = date;
    axios
      .post("http://localhost:8000/pet/addVaccination", values)
      .then((res) => {
        alert(res.data.message);
        handleClose();
        const data = { _id: Pet._id };
        axios
          .post("http://localhost:8000/pet/showPet", data)
          .then((r) => {
            setPet(r.data.pet);
            setValues({
              _id: "",
              DoseDate: dayjs("2000-01-01T00:00:00"),
              address: Pet.vaccination.address,
              status: "",
            });
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
        <h1 className="details-header-heading">Vaccination Details</h1>
        <Button onClick={handleOpen} color="error">
          <EditIcon />
        </Button>
      </div>
      <div className="details-more">
        {Pet.vaccination === undefined ||
        Pet.vaccination === null ||
        Pet.vaccination === {} ? (
          <div className="NA">Please Add Vaccination Details</div>
        ) : (
          <table>
            <tbody>
              <tr>
                <th>Vaccinated:</th>
                <td>{Pet.vaccination.status ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <th>Next Dose Date:</th>
                <td>
                  {Pet.vaccination.DoseDate
                    ? Pet.vaccination.DoseDate.slice(0, 10)
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <th>Vaccination Center Address:</th>
                <td>
                  {Pet.vaccination.address ? Pet.vaccination.address : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="add">
          <div className="add-wrapper">
            <div className="add-top-bar">
              <h2>Edit Vaccination Details</h2>
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
                    label="Next Dose Date"
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
                  name="vaccinationAddress"
                  id="vaccinationAddress"
                  label="Vaccination Address"
                  variant="outlined"
                  color="success"
                  sx={{ width: "100%", m: 1 }}
                  type="text"
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

export default Vaccination;
