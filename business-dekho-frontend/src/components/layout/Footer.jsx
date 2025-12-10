// src/components/layout/Footer.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box sx={{ py: 3, textAlign: "center", mt: 4, bgcolor: "#f5f5f5" }}>
    <Typography variant="body2">
      © {new Date().getFullYear()} BusinessDekho. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
