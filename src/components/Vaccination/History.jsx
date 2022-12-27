import {
  Table,
  th,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const History = ({ history, page }) => {
  if (history.length > 0 && page === "vaccination")
    return (
      <Box sx={{ width: "100%", p: 0, m: 0 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "white" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#e92e4a !important" }}>
                Sr#
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#e92e4a !important" }}>
                Dose Name
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#e92e4a !important" }}>
                Dose Date
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#e92e4a !important" }}>
                Address
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((row, i = 0) => {
              i++;
              return (
                <TableRow
                  sx={{ backgroundColor: i % 2 === 0 ? "white" : "initial" }}
                >
                  <TableCell>{i}</TableCell>
                  <TableCell>{row.DoseName}</TableCell>
                  <TableCell>{row.DoseDate.slice(0, 10)}</TableCell>
                  <TableCell>{row.address}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    );
  else if (history.length > 0 && page === "vet")
    return (
      <Box sx={{ width: "100%", p: 0, m: 0 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "white" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#e92e4a !important" }}>
                Sr#
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#e92e4a !important" }}>
                Reason
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#e92e4a !important" }}>
                Appointment Date
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#e92e4a !important" }}>
                Address
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((row, i = 0) => {
              i++;
              return (
                <TableRow>
                  <TableCell>{i}</TableCell>
                  <TableCell>{row.reason}</TableCell>
                  <TableCell>{row.AppointmentDate.slice(0, 10)}</TableCell>
                  <TableCell>{row.address}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    );
  else
    return (
      <Box
        sx={{
          width: "100%",
          p: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#e92e4a",
          fontSize: 20,
        }}
      >
        History Not Found
      </Box>
    );
};

export default History;
