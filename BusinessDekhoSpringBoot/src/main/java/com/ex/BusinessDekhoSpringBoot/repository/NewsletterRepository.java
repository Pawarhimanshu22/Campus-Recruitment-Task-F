package com.ex.BusinessDekhoSpringBoot.repository;
import com.ex.BusinessDekhoSpringBoot.model.Newsletter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NewsletterRepository extends JpaRepository<Newsletter, Long> {
    Optional<Newsletter> findByEmail(String email);
    boolean existsByEmail(String email);
}