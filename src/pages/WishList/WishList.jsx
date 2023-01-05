import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const WishList = ({ user, setUser }) => {
  const pet = user.pet_wish;
  const product = user.product_wish;
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "white",
          p: 1,
          color: "#e92e4a",
          textAlign: "center",
        }}
      >
        <h2>PET WISHLIST</h2>
      </Box>
      <Table>
        <TableBody>
          {pet.map((p) => {
            return (
              <TableRow>
                <TableCell>
                  <img src={p.image} alt={""} width="150px" />
                </TableCell>
                <TableCell>{p.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Box
        sx={{
          backgroundColor: "white",
          p: 1,
          color: "#e92e4a",
          textAlign: "center",
        }}
      >
        <h2>PRODUCT WISHLIST</h2>
      </Box>
      <Table>
        <TableBody>
          {product.map((p) => {
            return (
              <TableRow>
                <TableCell>
                  <img src={p.image} alt={""} width="150px" />
                </TableCell>
                <TableCell>{p.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default WishList;
