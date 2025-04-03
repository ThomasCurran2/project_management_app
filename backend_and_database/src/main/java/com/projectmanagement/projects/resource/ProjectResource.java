package com.projectmanagement.projects.resource;

import com.projectmanagement.projects.domain.Project;
import com.projectmanagement.projects.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

/**
 * ProjectResource is RestController used to set up handler methods for
 * http requests made at the "/projects" endpoint.
 * @author Thomas Curran
 *
 */
@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectResource {
    private final ProjectService projectService;

    /**
     * <p>Used to handle post requests made from the "/projects" endpoint.
     * </p>
     * @param project A Project object used as a parameter when calling projectService.createProject.
     * @return the HTTP response for the post request.
     * @since 1.0
     */
    @PostMapping
    public ResponseEntity<Project> createProject (@RequestBody Project project){
        return ResponseEntity.created(URI.create("/projects/projectID")).body(projectService.createProject(project));
    }

    /**
     * <p>Used to handle get requests form the "/projects" endpoint.
     * </p>
     * @param page Request parameter used to get the current page, used as a parameter in projectService.getAllProjects.
     * @param size Request parameter used to get the amount of page elements, used as a parameter in projectService.getAllProjects.
     * @return the HTTP response for the get request, and a Page of Project objects.
     * @since 1.0
     */
    @GetMapping
    public ResponseEntity<Page<Project>> getProjects(@RequestParam(value = "page", defaultValue = "0") int page,
                                                     @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok().body(projectService.getAllProjects(page, size));
    }

    /**
     * <p>Used to handle get requests form the "/projects/id" endpoint.
     * </p>
     * @param id Path variable used to get the project id, used as a parameter in projectService.getProject.
     * @return the HTTP response for the get request, and a Project object.
     * @since 1.0
     */
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable(value = "id") String id){
        return ResponseEntity.ok().body(projectService.getProject(id));
    }

    /**
     * <p>Used to delete specific credentials at the
     * "/projects/id" endpoint.
     * </p>
     * @param id Path variable used as a parameter when calling projectService.deleteProject.
     * @return the HTTP response for the delete request.
     * @since 1.0
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable(value = "id") String id){
        projectService.deleteProject(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
