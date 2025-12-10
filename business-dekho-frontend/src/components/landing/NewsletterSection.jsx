// src/components/landing/NewsletterSection.jsx
import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button, Stack } from "@mui/material";
import { subscribeNewsletter } from "../../api/newsletterApi";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      setLoading(true);
      await subscribeNewsletter(email); // hits /api/newsletter/subscribe
      alert("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Failed to subscribe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 6, bgcolor: "primary.main", color: "white" }}>
      <Container maxWidth="md">
        <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: 700 }}>
          Subscribe to Our Newsletter
        </Typography>
        <Typography variant="body2" align="center" sx={{ mb: 3 }}>
          Get the latest updates and insights directly to your inbox.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <TextField
              type="email"
              label="Email Address"
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ bgcolor: "white", borderRadius: 1, minWidth: 260 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </Stack>
        </form>
      </Container>
    </Box>
  );
};

export default NewsletterSection;
