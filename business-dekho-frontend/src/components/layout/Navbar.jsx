// src/components/layout/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="sticky" elevation={0} color="transparent">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          BusinessDekho
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button component={RouterLink} to="/" color="primary">
            Home
          </Button>
          <Button component={RouterLink} to="/admin/projects" variant="contained">
            Admin
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
