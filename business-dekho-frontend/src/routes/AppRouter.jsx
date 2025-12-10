// src/routes/AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import AdminProjectsPage from "../pages/admin/AdminProjectsPage";
import AdminClientsPage from "../pages/admin/AdminClientsPage";
import AdminContactsPage from "../pages/admin/AdminContactsPage";
import AdminNewsletterPage from "../pages/admin/AdminNewsletterPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin/projects" element={<AdminProjectsPage />} />
      <Route path="/admin/clients" element={<AdminClientsPage />} />
      <Route path="/admin/contacts" element={<AdminContactsPage />} />
      <Route path="/admin/newsletter" element={<AdminNewsletterPage />} />
    </Routes>
  );
};

export default AppRouter;
