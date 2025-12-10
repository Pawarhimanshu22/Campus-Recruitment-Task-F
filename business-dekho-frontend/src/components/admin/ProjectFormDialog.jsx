import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";

const ClientFormDialog = ({ open, onClose, onSave, initialData }) => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDesignation(initialData.designation || "");
      setDescription(initialData.description || "");
      setImageFile(null);
    } else {
      setName("");
      setDesignation("");
      setDescription("");
      setImageFile(null);
    }
  }, [initialData, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, designation, description, imageFile });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? "Edit Client" : "Add Client"}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
            <TextField
              label="Description"
              value={description}
              multiline
              minRows={3}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Button variant="outlined" component="label">
              {imageFile ? imageFile.name : "Upload Image"}
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ClientFormDialog;
