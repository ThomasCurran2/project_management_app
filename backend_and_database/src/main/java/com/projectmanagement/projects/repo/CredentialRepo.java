package com.projectmanagement.projects.repo;

import com.projectmanagement.projects.domain.Credential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * CredentialRepo is used to set up JPA functionality
 * and declare methods used in the CredentialResource file.
 * @author Thomas Curran
 *
 */
@Repository
public interface CredentialRepo extends JpaRepository<Credential, String> {
    Optional<Credential> findById(String id);
    Optional<Credential> findByUsername(String username);
}
