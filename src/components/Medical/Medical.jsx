import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import "./Medical.css";
import axios from "axios";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Add, Done } from "@mui/icons-material";
import url from "../../apiCalls/api";

// -------------------------------------------------------------------------

const Medical = ({ Pet, setPet }) => {
  const [values, setValues] = useState({
    _id: Pet._id,
    reason: "",
    AppointmentDate: dayjs("2000-01-01T00:00:00"),
    address: "",
  });
  const [Type, setType] = useState(Pet.vet.AppointmentDate ? "done" : "add");
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
    if (!values.reason) {
      alert("Please Enter Reason");
      return;
    }
    if (!date || date < Date.now()) {
      alert("Please Enter Valid Dose Date");
      return;
    }
    if (!values.address) {
      alert("Please Enter Address");
      return;
    }
    values.AppointmentDate = date;
    axios
      .post(url + "/pet/vet/add_appointment", values)
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
          .post(url + "/pet/show", data)
          .then((r) => {
            setPet(r.data.pet);
            setType("done");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };
  const markdone = () => {
    const data = { _id: Pet._id };
    axios
      .post(url + "/pet/vet/MarkAsDone", data)
      .then((res) => {
        alert(res.data.message);
        axios
          .post(url + "/pet/show", data)
          .then((res) => {
            setPet(res.data.pet);
            handleClose();
            setType("add");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          p: 2,
          backgroundColor: "white",
          borderBottom: "1px solid #c2c2c2",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 className="details-header-heading">Medical Details</h1>
        {!Pet.vet.AppointmentDate ? (
          <IconButton onClick={handleOpen} color="error">
            <Add />
          </IconButton>
        ) : (
          <></>
        )}
      </Box>
      <Box sx={{ width: "100%" }}>
        {Pet.vet === undefined || Pet.vet === null || Pet.vet === {} ? (
          <div className="NA">Please Add Vet Details</div>
        ) : (
          <Table sx={{ width: "100%" }}>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: "#2f2f2f" }}>
                  Next Appointment Date:
                </TableCell>
                <TableCell>
                  {Pet.vet.AppointmentDate !== null
                    ? Pet.vet.AppointmentDate.slice(0, 10)
                    : "N/A"}
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#2f2f2f" }}>
                  Appointment Reason:
                </TableCell>
                <TableCell>{Pet.vet.reason ? Pet.vet.reason : "N/A"}</TableCell>
                <TableCell>
                  {Pet.vet.AppointmentDate ? (
                    <IconButton color="error" onClick={handleOpen}>
                      <Done />
                    </IconButton>
                  ) : (
                    <></>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: "#2f2f2f" }}>
                  Vet Address:
                </TableCell>
                <TableCell>
                  {Pet.vet.address ? Pet.vet.address : "N/A"}
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: "#2f2f2f" }}>
                  Previous Appointment Date:
                </TableCell>
                <TableCell>
                  {Pet.vet_history.length > 0
                    ? Pet.vet_history[Pet.vet_history.length - 1]
                        .AppointmentDate !== null
                      ? Pet.vet_history[
                          Pet.vet_history.length - 1
                        ].AppointmentDate.slice(0, 10)
                      : "N/A"
                    : "N/A"}
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#2f2f2f" }}>
                  Previous Appointment Reason:
                </TableCell>
                <TableCell>
                  {Pet.vet_history.length > 0
                    ? Pet.vet_history[Pet.vet_history.length - 1].reason
                    : "N/A"}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </Box>
      <Modal open={open} onClose={handleClose}>
        {Type === "add" ? (
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
                  <TextField
                    type="text"
                    name="reason"
                    id="reason"
                    label="Reason"
                    variant="outlined"
                    color="success"
                    sx={{ width: "100%", m: 1 }}
                    onChange={handleChange("reason")}
                    value={values.reason}
                  />
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
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 400,
                p: 2,
                backgroundColor: "white",
                borderRadius: 2,
              }}
            >
              Confirm Mark as Done? Once confirmed can not be Reverted...
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={handleClose}>Cancle</Button>
                <Button onClick={markdone}>Confirm</Button>
              </Box>
            </Box>
          </Box>
        )}
      </Modal>
    </>
  );
};

export default Medical;
