// src/components/landing/ProjectsSection.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { getProjects } from "../../api/projectApi";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Error fetching projects", err));
  }, []);

  return (
    <Box sx={{ py: 8, bgcolor: "#f9fafb" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 4 }}>
          Our Projects
        </Typography>

        <Grid container spacing={4}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                {project.imageUrl && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={project.imageUrl}   // make sure DTO has this
                    alt={project.name}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {project.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {project.description}
                  </Typography>
                  <Button size="small" variant="outlined">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProjectsSection;
