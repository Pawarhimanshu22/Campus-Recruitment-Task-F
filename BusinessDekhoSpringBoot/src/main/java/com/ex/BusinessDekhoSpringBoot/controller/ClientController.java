package com.ex.BusinessDekhoSpringBoot.controller;


import com.ex.BusinessDekhoSpringBoot.dto.ClientDTO;
import com.ex.BusinessDekhoSpringBoot.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "*")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @PostMapping
    public ResponseEntity<ClientDTO> createClient(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("designation") String designation,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        ClientDTO client = clientService.createClient(name, description, designation, image);
        return new ResponseEntity<>(client, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ClientDTO>> getAllClients() {
        List<ClientDTO> clients = clientService.getAllClients();
        return ResponseEntity.ok(clients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDTO> getClientById(@PathVariable Long id) {
        ClientDTO client = clientService.getClientById(id);
        return ResponseEntity.ok(client);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientDTO> updateClient(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("designation") String designation,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        ClientDTO client = clientService.updateClient(id, name, description, designation, image);
        return ResponseEntity.ok(client);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
}