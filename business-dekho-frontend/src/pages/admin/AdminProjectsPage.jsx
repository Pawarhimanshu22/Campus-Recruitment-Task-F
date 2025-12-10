// src/pages/admin/AdminProjectsPage.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Stack,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import ProjectFormDialog from "../../components/admin/ProjectFormDialog";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../api/projectApi";
import Navbar from "../../components/layout/Navbar";

const AdminProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const loadProjects = () => {
    getProjects()
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleAddClick = () => {
    setEditingProject(null);
    setOpenDialog(true);
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setOpenDialog(true);
  };

  const handleSave = async (data) => {
    try {
      if (editingProject) {
        await updateProject(editingProject.id, data);
      } else {
        await createProject(data);
      }
      setOpenDialog(false);
      loadProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to save project");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      loadProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  return (
    <Box>
      <Navbar />
      <Container sx={{ py: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Admin – Projects
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddClick}
          >
            Add Project
          </Button>
        </Stack>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.description}</TableCell>
                <TableCell>{p.imageUrl}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEditClick(p)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(p.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <ProjectFormDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSave={handleSave}
          initialData={editingProject}
        />
      </Container>
    </Box>
  );
};

export default AdminProjectsPage;
