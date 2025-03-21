package com.projectmanagement.projects.service;

import com.projectmanagement.projects.domain.Credential;
import com.projectmanagement.projects.repo.CredentialRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class CredentialService {
    private final CredentialRepo credentialRepo;

    private final PasswordEncoder passwordEncoder;

    public Page<Credential> getAllCredentials(int page, int size){
        return credentialRepo.findAll(PageRequest.of(page, size, Sort.by("username")));
    }

    public Credential getCredential(String username){
        return credentialRepo.findByUsername(username).orElseThrow(() -> new RuntimeException("Credential not found"));
    }

    public Credential createCredential(Credential credential){
        if (credentialRepo.findByUsername((credential.getUsername())).isPresent()){
            throw new DuplicateKeyException("Username already exists!");
        }

        if(Objects.equals(credential.getPassword(), "adminpassword")){
            credential.setPermission("Admin");
        }
        else {
            credential.setPermission("Employee");
        }
        String encodedPassword = passwordEncoder.encode(credential.getPassword());
        credential.setPassword(encodedPassword);
        return credentialRepo.save(credential);
    }

    public void deleteCredential(String id) {
        credentialRepo.deleteById(id);
    }

    public boolean authenticate(String username, String password) {
        Credential credential = credentialRepo.findByUsername(username).orElseThrow(() -> new RuntimeException("Credential not found"));;
        if (credential != null) {
            return passwordEncoder.matches(password, credential.getPassword());
        }
        return false;
    }
}
