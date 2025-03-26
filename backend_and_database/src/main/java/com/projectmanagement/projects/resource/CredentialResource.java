package com.projectmanagement.projects.resource;

import com.projectmanagement.projects.domain.Credential;
import com.projectmanagement.projects.service.CredentialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/credentials")
@RequiredArgsConstructor
public class CredentialResource {
    private final CredentialService credentialService;

    @PostMapping
    public ResponseEntity<Credential> createCredential (@RequestBody Credential credential){
        return ResponseEntity.created(URI.create("/credentials/credentialID")).body(credentialService.createCredential(credential));
    }
/*
    @GetMapping("/{id}")
    public ResponseEntity<Page<Credential>> getCredentials(@RequestParam(value = "page", defaultValue = "0") int page,
                                                             @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok().body(credentialService.getAllCredentials(page, size));
    }

                @GetMapping("/{id}")
                public ResponseEntity<Credential> getCredential(@PathVariable(value = "id") String id){
                    return ResponseEntity.ok().body(credentialService.getCredential(id));
                }
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCredential(@PathVariable(value = "id") String id){
        credentialService.deleteCredential(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
