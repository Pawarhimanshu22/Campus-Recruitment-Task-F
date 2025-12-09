package com.ex.BusinessDekhoSpringBoot.service;


import com.ex.BusinessDekhoSpringBoot.dto.NewsletterDTO;
import com.ex.BusinessDekhoSpringBoot.model.Newsletter;
import com.ex.BusinessDekhoSpringBoot.repository.NewsletterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NewsletterService {

    @Autowired
    private NewsletterRepository newsletterRepository;

    public NewsletterDTO subscribe(NewsletterDTO newsletterDTO) {
        if (newsletterRepository.existsByEmail(newsletterDTO.getEmail())) {
            throw new RuntimeException("Email already subscribed!");
        }

        Newsletter newsletter = new Newsletter();
        newsletter.setEmail(newsletterDTO.getEmail());

        Newsletter savedNewsletter = newsletterRepository.save(newsletter);
        return convertToDTO(savedNewsletter);
    }

    public List<NewsletterDTO> getAllSubscriptions() {
        return newsletterRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void unsubscribe(Long id) {
        if (!newsletterRepository.existsById(id)) {
            throw new RuntimeException("Subscription not found with id: " + id);
        }
        newsletterRepository.deleteById(id);
    }

    private NewsletterDTO convertToDTO(Newsletter newsletter) {
        NewsletterDTO dto = new NewsletterDTO();
        dto.setId(newsletter.getId());
        dto.setEmail(newsletter.getEmail());
        return dto;
    }
}