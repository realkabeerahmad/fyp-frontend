import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import "./Vaccination.css";
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
import { Add, Done, History } from "@mui/icons-material";
import url from "../../apiCalls/api";

// -------------------------------------------------------------------------

const Vaccination = ({ Pet, setPet }) => {
  const [values, setValues] = useState({
    _id: Pet._id,
    DoseName: "",
    DoseDate: dayjs("2000-01-01T00:00:00"),
    address: "",
    status: true,
  });
  const [date, setDate] = useState(dayjs("2019-01-20T21:11:54"));
  const [open, setOpen] = useState(false);
  const [Type, setType] = useState(
    Pet.vaccination ? (Pet.vaccination.DoseDate ? "done" : "add") : "add"
  );

  const handleChange = (value) => (e) => {
    setValues({ ...values, [value]: e.target.value });
  };

  const handleDate = (e) => {
    setDate(e);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.DoseName) {
      alert("Please Enter Dose Name");
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
    values.DoseDate = date;
    values._id = Pet._id;
    axios
      .post(url + "/pet/vaccination/add_new", values)
      .then((res) => {
        alert(res.data.message);
        handleClose();
        const data = { _id: Pet._id };
        axios
          .post(url + "/pet/show", data)
          .then((r) => {
            setPet(r.data.pet);
            setType("done");
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
  const markdone = () => {
    const data = { _id: Pet._id };
    axios
      .post(url + "/pet/vaccination/MarkAsDone", data)
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
        <h1 className="details-header-heading">Vaccination Details</h1>
        <Box>
          {!Pet.vaccination.DoseDate ? (
            <IconButton onClick={handleOpen} color="error">
              <Add />
            </IconButton>
          ) : (
            <></>
          )}
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        {Pet.vaccination === undefined ||
        Pet.vaccination === null ||
        Pet.vaccination === {} ? (
          <div className="NA">Please Add Vaccination Details</div>
        ) : (
          <Table sx={{ width: "100%" }}>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: "#2f2f2f" }}>
                  Dose Date:
                </TableCell>
                <TableCell>
                  {Pet.vaccination.DoseDate !== null
                    ? Pet.vaccination.DoseDate.slice(0, 10)
                    : "N/A"}
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#2f2f2f" }}>
                  Vaccination Name:
                </TableCell>
                <TableCell>
                  {Pet.vaccination.DoseName ? Pet.vaccination.DoseName : "N/A"}
                </TableCell>
                <TableCell>
                  {Pet.vaccination.DoseDate ? (
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
                  Vaccination Center Address:
                </TableCell>
                <TableCell>
                  {Pet.vaccination.address ? Pet.vaccination.address : "N/A"}
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              {Pet.vaccination_history &&
              Pet.vaccination_history.length > -1 ? (
                <>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: "#2f2f2f" }}>
                      Previous Dose Date:
                    </TableCell>
                    <TableCell>
                      {Pet.vaccination_history[
                        Pet.vaccination_history.length - 1
                      ]
                        ? Pet.vaccination_history[
                            Pet.vaccination_history.length - 1
                          ].DoseDate.slice(0, 10)
                        : "N/A"}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "#2f2f2f" }}>
                      Previous Vaccination Name:
                    </TableCell>
                    <TableCell>
                      {Pet.vaccination_history[
                        Pet.vaccination_history.length - 1
                      ]
                        ? Pet.vaccination_history[
                            Pet.vaccination_history.length - 1
                          ].DoseName
                        : "N/A"}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        )}
      </Box>
      <Modal open={open} onClose={handleClose}>
        {Type === "add" ? (
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
                  <TextField
                    name="DoseName"
                    id="DoseName"
                    label="Dose Name"
                    variant="outlined"
                    color="success"
                    sx={{ width: "100%", m: 1 }}
                    type="text"
                    onChange={handleChange("DoseName")}
                    value={values.DoseName}
                  />
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

export default Vaccination;
