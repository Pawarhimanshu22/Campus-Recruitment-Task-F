// src/components/landing/ClientsSection.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { getClients } from "../../api/clientApi";

const ClientsSection = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients()
      .then((res) => setClients(res.data))
      .catch((err) => console.error("Error fetching clients", err));
  }, []);

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 4 }}>
          Happy Clients
        </Typography>

        <Grid container spacing={4}>
          {clients.map((client) => (
            <Grid item xs={12} sm={6} md={3} key={client.id}>
              <Card sx={{ textAlign: "center", p: 2 }}>
                <Avatar
                  src={client.imageUrl}  // adjust field name if needed
                  alt={client.name}
                  sx={{ width: 64, height: 64, mx: "auto", mb: 2 }}
                />
                <CardContent>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {client.description}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {client.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {client.designation}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ClientsSection;
