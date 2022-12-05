import { Box } from "@mui/material";
import React from "react";
import "./ErrorPage.css";

// -------------------------------------

const ErrorPage = () => {
  return (
    <Box className="Error-Page" sx={{ backgroundColor: "white" }}>
      <div className="Error">
        <h1>LOST PAGE</h1>
        <h1 className="_404">404</h1>
        <h1>Page requested is not found</h1>
      </div>
    </Box>
  );
};

export default ErrorPage;
