package com.ex.BusinessDekhoSpringBoot.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientDTO {
    private Long id;

    @NotBlank(message = "Client name is required")
    private String name;

    private String description;
    private String designation;
    private String imageUrl;
}