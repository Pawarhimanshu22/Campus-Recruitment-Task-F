package com.ex.BusinessDekhoSpringBoot.service;



import com.ex.BusinessDekhoSpringBoot.dto.ContactDTO;
import com.ex.BusinessDekhoSpringBoot.model.Contact;
import com.ex.BusinessDekhoSpringBoot.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public ContactDTO createContact(ContactDTO contactDTO) {
        Contact contact = new Contact();
        contact.setFullName(contactDTO.getFullName());
        contact.setEmail(contactDTO.getEmail());
        contact.setMobileNumber(contactDTO.getMobileNumber());
        contact.setCity(contactDTO.getCity());

        Contact savedContact = contactRepository.save(contact);
        return convertToDTO(savedContact);
    }

    public List<ContactDTO> getAllContacts() {
        return contactRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ContactDTO getContactById(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));
        return convertToDTO(contact);
    }

    public void deleteContact(Long id) {
        if (!contactRepository.existsById(id)) {
            throw new RuntimeException("Contact not found with id: " + id);
        }
        contactRepository.deleteById(id);
    }

    private ContactDTO convertToDTO(Contact contact) {
        ContactDTO dto = new ContactDTO();
        dto.setId(contact.getId());
        dto.setFullName(contact.getFullName());
        dto.setEmail(contact.getEmail());
        dto.setMobileNumber(contact.getMobileNumber());
        dto.setCity(contact.getCity());
        return dto;
    }
}
