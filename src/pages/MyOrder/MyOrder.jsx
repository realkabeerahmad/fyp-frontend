import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import url from "../../apiCalls/api";
const columns = [
  { id: "Name", label: "Name", minWidth: 150, align: "center" },
  { id: "Address", label: "Address", minWidth: 150, align: "center" },
  { id: "Phone", label: "Phone", minWidth: 100, align: "center" },
  {
    id: "ShippingFee",
    label: "Shipping Fee",
    minWidth: 30,
    align: "center",
    format: (value) => "PKR " + value.toLocaleString("en-US"),
  },
  { id: "Payment", label: "Payment", minWidth: 30, align: "center" },
  { id: "createdAt", label: "Order Date", minWidth: 30, align: "center" },
  {
    id: "TotalAmount",
    label: "Total Amount",
    minWidth: 30,
    align: "center",
    format: (value) => "PKR " + value.toLocaleString("en-US"),
  },
  { id: "status", label: "Status", minWidth: 30, align: "center" },
  { id: "TrackingId", label: "Tracking ID", minWidth: 50, align: "center" },
  {
    id: "TrackingService",
    label: "Tracking Service",
    minWidth: 50,
    align: "center",
  },
];

export default function MyOrder({ user }) {
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    fetchUsers();
    return () => {};
  }, []);

  const fetchUsers = () => {
    const data = { userId: user._id };
    axios.post(url + "/shop/order/show/user", data).then((res) => {
      console.log(res.data.orders);
      setUsers(res.data.orders);
    });
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#e92e4a",
          p: 1,
          backgroundColor: "white",
          borderBottom: "1px solid #c2c2c2",
        }}>
        <h2>My Orders</h2>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: "700" }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Link
                              to={"/user/orders/" + row._id}
                              style={{ width: "100%", color: "#2f2f2f" }}>
                              {(column.format && typeof value === "boolean") ||
                              typeof value === "number"
                                ? column.format(value)
                                : value}
                            </Link>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
