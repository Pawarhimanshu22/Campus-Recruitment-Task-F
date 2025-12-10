import React from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";

const HeroSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: "primary.main", color: "white" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Consultation, Design & Marketing
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              We help businesses grow with smart digital strategies and modern design.
            </Typography>
            <Button variant="contained" color="secondary">
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>{/* image / illustration later */}</Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
