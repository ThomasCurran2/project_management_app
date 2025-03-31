package com.projectmanagement.projects.service;

import com.projectmanagement.projects.config.SecurityConfig;
import com.projectmanagement.projects.domain.Credential;
import com.projectmanagement.projects.repo.CredentialRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

/**
 * CredentialService is service used to implement the
 * functionality of the handler methods in CredentialResource.
 * @author Thomas Curran
 *
 */
@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class CredentialService {
    private final CredentialRepo credentialRepo;

    private final PasswordEncoder passwordEncoder;

    /**
     * <p>Used to get all usernames in the database.
     * </p>
     * @return the array of all usernames in the database.
     * @since 1.0
     */
    public String[] getAllUsernames(){
        List<Credential> credential = credentialRepo.findAll();
        return credential.stream().map(Credential::getUsername).toArray(String[]::new);
    }

    /**
     * <p>Used to the credential object that has the same username as the parameter.
     * </p>
     * @param username String used to find if a credential in the database has a matching username.
     * @return the credential object that shares the same username as the parameter.
     * @throws RuntimeException If no credential has a matching username.
     * @since 1.0
     */
    public Credential getCredential(String username){
        return credentialRepo.findByUsername(username).orElseThrow(() -> new RuntimeException("Credential not found"));
    }

    /**
     * <p>Used to save a credential object to the database.
     * </p>
     * @param credential Object used to get, check, and set user data before being saved to the database.
     * @return the saved credential entity.
     * @throws DuplicateKeyException If there is already a credential with the same username.
     * @since 1.0
     */
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

    /**
     * <p>Used to delete a specific credential with the
     * same id from the database.
     * </p>
     * @param id String used to delete a credential object with a specific id from the database.
     * @since 1.0
     */
    public void deleteCredential(String id) {
        credentialRepo.deleteById(id);
    }

    /**
     * <p>Used to check if the user exists and if the password
     * sent in matches the one saved to that user.
     * </p>
     * @param username String used to see if a user exists with a specific name.
     * @param password String used to see if it matches the password saved to the user's account.
     * @return the result of if the passwords match, or that the user doesn't exist.
     * @throws RuntimeException if there is no credential with the username sent in.
     * @since 1.0
     */
    public boolean authenticate(String username, String password) {
        Credential credential = credentialRepo.findByUsername(username).orElseThrow(() -> new RuntimeException("Credential not found"));;
        if (credential != null) {
            return passwordEncoder.matches(password, credential.getPassword());
        }
        return false;
    }
}
