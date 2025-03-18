package com.projectmanagement.projects.resource;

import com.projectmanagement.projects.domain.Project;
import com.projectmanagement.projects.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectResource {
    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<Project> createProject (@RequestBody Project project){
        return ResponseEntity.created(URI.create("/projects/projectID")).body(projectService.createProject(project));
    }

    @GetMapping
    public ResponseEntity<Page<Project>> getProjects(@RequestParam(value = "page", defaultValue = "0") int page,
                                                     @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok().body(projectService.getAllProjects(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable(value = "id") String id){
        return ResponseEntity.ok().body(projectService.getProject(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable(value = "id") String id){
        projectService.deleteProject(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
