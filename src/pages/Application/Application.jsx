import { Cancel, Done } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../../apiCalls/api";

const Application = ({ user }) => {
  // -------------------------------------
  const [data, setData] = useState({ shelterId: user._id });
  const [app, setApp] = useState([]);
  useEffect(() => {
    fetchItem();
  }, []);
  // ----------------------------------------
  const fetchItem = () => {
    axios
      .post(url + "/adoption/applications/show/shelters", data)
      .then((res) => {
        // console.log(res.data);
        setApp(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // ------------------------------------
  return (
    <Box>
      <Table>
        <TableHead sx={{ backgroundColor: "white" }}>
          <TableRow>
            <TableCell>Pet Name</TableCell>
            <TableCell>Applicant Name</TableCell>
            <TableCell>Applicant Email</TableCell>
            <TableCell>Applicant Phone</TableCell>
            <TableCell>Applicant CNIC</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {app.length > 0 ? (
            app.map((e) => {
              return <Row key={e._id} e={e} user={user} setApp={setApp} />;
            })
          ) : (
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>No Data Found</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            // <Box>No Data Found</Box>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

const Row = ({ e, user, setApp }) => {
  const [data, setData] = useState({ shelterId: user._id });
  // const [app, setApp] = useState([]);
  const fetchItem = () => {
    axios
      .post(url + "/adoption/applications/show/shelters", data)
      .then((res) => {
        // console.log(res.data);
        setApp(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateStatus = (id, status) => {
    const uri = "/adoption/applications/status";
    const data = { _id: id, shelterId: user._id, status: status };
    axios.post(url + uri, data).then((res) => {
      if (res.data.status === "success") {
        fetchItem();
      } else {
        alert(res.data.message);
      }
    });
  };
  return (
    <TableRow>
      <TableCell>{e.pet.name}</TableCell>
      <TableCell>{e.user.name}</TableCell>
      <TableCell>
        <a href={`mailto:${e.user.email}`} target="_blank">
          {e.user.email}
        </a>
      </TableCell>
      <TableCell>
        <a href={`tell:${e.user.phone}`} target="_blank">
          {e.user.phone}
        </a>
      </TableCell>
      <TableCell>{e.user.cnic}</TableCell>
      <TableCell>{e.status}</TableCell>
      <TableCell>
        <IconButton
          disabled={e.status && e.status === "Pending" ? false : true}
          onClick={(key) => updateStatus(e._id, "Approved")}
        >
          <Done />
        </IconButton>
        <IconButton
          disabled={e.status && e.status === "Pending" ? false : true}
          onClick={(key) => updateStatus(e._id, "Rejected")}
        >
          <Cancel />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

// export default Application
export default Application;
