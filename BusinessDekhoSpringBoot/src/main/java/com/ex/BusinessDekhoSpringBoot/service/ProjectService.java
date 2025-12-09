package com.ex.BusinessDekhoSpringBoot.service;


import com.ex.BusinessDekhoSpringBoot.dto.ProjectDTO;
import com.ex.BusinessDekhoSpringBoot.model.Project;
import com.ex.BusinessDekhoSpringBoot.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private FileStorageService fileStorageService;

    public ProjectDTO createProject(String name, String description, MultipartFile image) {
        Project project = new Project();
        project.setName(name);
        project.setDescription(description);

        if (image != null && !image.isEmpty()) {
            String fileName = fileStorageService.storeFile(image, true);
            project.setImageUrl("/uploads/" + fileName);
        }

        Project savedProject = projectRepository.save(project);
        return convertToDTO(savedProject);
    }

    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProjectDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        return convertToDTO(project);
    }

    public ProjectDTO updateProject(Long id, String name, String description,
                                    MultipartFile image) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        project.setName(name);
        project.setDescription(description);

        if (image != null && !image.isEmpty()) {
            if (project.getImageUrl() != null) {
                String oldFileName = project.getImageUrl().replace("/uploads/", "");
                fileStorageService.deleteFile(oldFileName);
            }
            String fileName = fileStorageService.storeFile(image, true);
            project.setImageUrl("/uploads/" + fileName);
        }

        Project updatedProject = projectRepository.save(project);
        return convertToDTO(updatedProject);
    }

    public void deleteProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        if (project.getImageUrl() != null) {
            String fileName = project.getImageUrl().replace("/uploads/", "");
            fileStorageService.deleteFile(fileName);
        }

        projectRepository.delete(project);
    }

    private ProjectDTO convertToDTO(Project project) {
        ProjectDTO dto = new ProjectDTO();
        dto.setId(project.getId());
        dto.setName(project.getName());
        dto.setDescription(project.getDescription());
        dto.setImageUrl(project.getImageUrl());
        return dto;
    }
}