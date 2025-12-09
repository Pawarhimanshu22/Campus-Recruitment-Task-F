package com.ex.BusinessDekhoSpringBoot.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDTO {
    private Long id;

    @NotBlank(message = "Project name is required")
    private String name;

    private String description;
    private String imageUrl;
}