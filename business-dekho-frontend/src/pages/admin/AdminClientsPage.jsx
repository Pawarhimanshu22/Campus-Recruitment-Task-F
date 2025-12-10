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
import Navbar from "../../components/layout/Navbar";
import ClientFormDialog from "../../components/admin/ClientFormDialog";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "../../api/clientApi";

const AdminClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const loadClients = () => {
    getClients()
      .then((res) => setClients(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleAddClick = () => {
    setEditingClient(null);
    setOpenDialog(true);
  };

  const handleEditClick = (client) => {
    setEditingClient(client);
    setOpenDialog(true);
  };

  const handleSave = async (data) => {
    try {
      if (editingClient) {
        await updateClient(editingClient.id, data);
      } else {
        await createClient(data);
      }
      setOpenDialog(false);
      loadClients();
    } catch (err) {
      console.error(err);
      alert("Failed to save client");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this client?")) return;
    try {
      await deleteClient(id);
      loadClients();
    } catch (err) {
      console.error(err);
      alert("Failed to delete client");
    }
  };

  return (
    <Box>
      <Navbar />
      <Container sx={{ py: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Admin – Clients
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddClick}
          >
            Add Client
          </Button>
        </Stack>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image URL</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.designation}</TableCell>
                <TableCell>{c.description}</TableCell>
                <TableCell>{c.imageUrl}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEditClick(c)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(c.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <ClientFormDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSave={handleSave}
          initialData={editingClient}
        />
      </Container>
    </Box>
  );
};

export default AdminClientsPage;
