package com.ex.BusinessDekhoSpringBoot.repository;

import com.ex.BusinessDekhoSpringBoot.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
}