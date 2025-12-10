// src/components/landing/ContactFormSection.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { createContact } from "../../api/contactApi";

const ContactFormSection = () => {
  const [form, setForm] = useState({
    fullName: "",
    emailAddress: "",    // ✅ use emailAddress
    mobileNumber: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createContact(form);      // sends { fullName, emailAddress, mobileNumber, city }
      alert("Submitted successfully!");
      setForm({ fullName: "", emailAddress: "", mobileNumber: "", city: "" });
    } catch (err) {
      console.error("CONTACT ERROR:", err.response?.data || err.message);
      alert("Failed to submit contact.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            bgcolor: "#263b5e",
            color: "white",
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
            Get a Free Consultation
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                name="fullName"
                label="Full Name"
                size="small"
                value={form.fullName}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{ sx: { bgcolor: "white", borderRadius: 1 } }}
              />
              <TextField
                name="emailAddress"           // ✅ name matches DTO
                label="Email Address"
                size="small"
                type="email"
                value={form.emailAddress}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{ sx: { bgcolor: "white", borderRadius: 1 } }}
              />
              <TextField
                name="mobileNumber"
                label="Mobile Number"
                size="small"
                value={form.mobileNumber}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{ sx: { bgcolor: "white", borderRadius: 1 } }}
              />
              <TextField
                name="city"
                label="City"
                size="small"
                value={form.city}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{ sx: { bgcolor: "white", borderRadius: 1 } }}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={loading}
                sx={{ mt: 1 }}
              >
                {loading ? "Submitting..." : "Get Quick Quote"}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default ContactFormSection;
