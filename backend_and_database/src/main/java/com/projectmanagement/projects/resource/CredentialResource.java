package com.projectmanagement.projects.resource;

import com.projectmanagement.projects.domain.Credential;
import com.projectmanagement.projects.domain.Project;
import com.projectmanagement.projects.service.CredentialService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

/**
 * CredentialResource is RestController used to set up handler methods for
 * http requests made at the "/credentials" endpoint.
 * @author Thomas Curran
 *
 */
@RestController
@RequestMapping("/credentials")
@RequiredArgsConstructor
public class CredentialResource {
    private final CredentialService credentialService;

    /**
     * <p>Used to handle post requests made from the "/credentials" endpoint
     * </p>
     * @param credential A Credential object used as a parameter when calling credentialService.createCredential.
     * @return the HTTP response for the post request.
     * @since 1.0
     */
    @PostMapping
    public ResponseEntity<Credential> createCredential (@RequestBody Credential credential){
        return ResponseEntity.created(URI.create("/credentials/credentialID")).body(credentialService.createCredential(credential));
    }

    /**
     * <p>Used to check if the inputted username and password are correct,
     * and return the appropriate data depending on the outcome.
     * </p>
     * @param username Request parameter used to get the credential object with a specific username.
     * @param password Request parameter used to check if the inputted password matches the password in the database.
     * @return the HTTP response for the get request, and a list of objects used in the main projects page.
     * @since 1.0
     */
    @GetMapping
    public ResponseEntity<List<Object>> getAuthenticated(@RequestParam(value = "username") String username, @RequestParam(value = "password") String password){
        List<Object> response = new ArrayList<>();
        boolean match = credentialService.authenticate(username, password);

        if(match) {
            Credential credential = credentialService.getCredential(username);

            response.add("true");
            response.add(credential.getUsername());
            response.add(credential.getPermission());
            response.add(credentialService.getAllUsernames());
        } else {
            response.add("false");
            response.add("null");
            response.add("null");
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
/*
    @GetMapping
    public ResponseEntity<Page<Credential>> getAllCredentials(@RequestParam(value = "page", defaultValue = "0") int page,
                                                     @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok().body(credentialService.getAllCreds(page, size));
}
 */

    /**
     * <p>Used to delete specific credentials at the
     * "/credentials/id" endpoint.
     * </p>
     * @param id Path variable used as a parameter when calling credentialService.deleteCredential.
     * @return the HTTP response for the delete request.
     * @since 1.0
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCredential(@PathVariable(value = "id") String id){
        credentialService.deleteCredential(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
