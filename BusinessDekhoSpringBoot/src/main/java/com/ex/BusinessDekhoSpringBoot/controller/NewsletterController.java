package com.ex.BusinessDekhoSpringBoot.controller;


import com.ex.BusinessDekhoSpringBoot.dto.NewsletterDTO;
import com.ex.BusinessDekhoSpringBoot.service.NewsletterService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.*;


import java.util.List;

@RestController
@RequestMapping("/api/newsletter")
@CrossOrigin(origins = "*")
public class NewsletterController {

    @Autowired
    private NewsletterService newsletterService;

    @PostMapping("/subscribe")
    public ResponseEntity<NewsletterDTO> subscribe(@Valid @RequestBody NewsletterDTO newsletterDTO) {
        NewsletterDTO newsletter = newsletterService.subscribe(newsletterDTO);
        return new ResponseEntity<>(newsletter, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<NewsletterDTO>> getAllSubscriptions() {
        List<NewsletterDTO> subscriptions = newsletterService.getAllSubscriptions();
        return ResponseEntity.ok(subscriptions);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> unsubscribe(@PathVariable Long id) {
        newsletterService.unsubscribe(id);
        return ResponseEntity.noContent().build();
    }
}