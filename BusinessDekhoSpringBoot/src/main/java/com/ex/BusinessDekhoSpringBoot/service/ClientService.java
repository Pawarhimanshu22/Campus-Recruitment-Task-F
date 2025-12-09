package com.ex.BusinessDekhoSpringBoot.service;



import com.ex.BusinessDekhoSpringBoot.dto.ClientDTO;
import com.ex.BusinessDekhoSpringBoot.model.Client;
import com.ex.BusinessDekhoSpringBoot.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private FileStorageService fileStorageService;

    public ClientDTO createClient(String name, String description, String designation,
                                  MultipartFile image) {
        Client client = new Client();
        client.setName(name);
        client.setDescription(description);
        client.setDesignation(designation);

        if (image != null && !image.isEmpty()) {
            String fileName = fileStorageService.storeFile(image, true);
            client.setImageUrl("/uploads/" + fileName);
        }

        Client savedClient = clientRepository.save(client);
        return convertToDTO(savedClient);
    }

    public List<ClientDTO> getAllClients() {
        return clientRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ClientDTO getClientById(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));
        return convertToDTO(client);
    }

    public ClientDTO updateClient(Long id, String name, String description,
                                  String designation, MultipartFile image) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));

        client.setName(name);
        client.setDescription(description);
        client.setDesignation(designation);

        if (image != null && !image.isEmpty()) {
            if (client.getImageUrl() != null) {
                String oldFileName = client.getImageUrl().replace("/uploads/", "");
                fileStorageService.deleteFile(oldFileName);
            }
            String fileName = fileStorageService.storeFile(image, true);
            client.setImageUrl("/uploads/" + fileName);
        }

        Client updatedClient = clientRepository.save(client);
        return convertToDTO(updatedClient);
    }

    public void deleteClient(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));

        if (client.getImageUrl() != null) {
            String fileName = client.getImageUrl().replace("/uploads/", "");
            fileStorageService.deleteFile(fileName);
        }

        clientRepository.delete(client);
    }

    private ClientDTO convertToDTO(Client client) {
        ClientDTO dto = new ClientDTO();
        dto.setId(client.getId());
        dto.setName(client.getName());
        dto.setDescription(client.getDescription());
        dto.setDesignation(client.getDesignation());
        dto.setImageUrl(client.getImageUrl());
        return dto;
    }
}