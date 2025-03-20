package com.projectmanagement.projects.repo;

import com.projectmanagement.projects.domain.Credential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CredentialRepo extends JpaRepository<Credential, String> {
    Optional<Credential> findById(String id);
    Credential findByUsername(String username);
}
