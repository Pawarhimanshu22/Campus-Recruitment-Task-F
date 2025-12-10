// src/pages/LandingPage.jsx
import React from "react";
import { Box } from "@mui/material";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/landing/HeroSection";
import ProjectsSection from "../components/landing/ProjectsSection";
import ClientsSection from "../components/landing/ClientsSection";
import ContactFormSection from "../components/landing/ContactFormSection";
import NewsletterSection from "../components/landing/NewsletterSection";

const LandingPage = () => {
  return (
    <Box>
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <ClientsSection />
      <ContactFormSection />
      <NewsletterSection />
      <Footer />
    </Box>
  );
};

export default LandingPage;
