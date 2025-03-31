package com.projectmanagement.projects.service;

import com.projectmanagement.projects.domain.Project;
import com.projectmanagement.projects.repo.ProjectRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

/**
 * ProjectService is service used to implement the
 * functionality of the handler methods in ProjectResource.
 * @author Thomas Curran
 *
 */
@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepo projectRepo;

    /**
     * <p>Used to get all project entities in the database.
     * </p>
     * @param page Int used to get a specific page.
     * @param size Int used to specify the amount of page elements.
     * @return A Page of Project objects.
     * @since 1.0
     */
    public Page<Project> getAllProjects(int page, int size){
        return projectRepo.findAll(PageRequest.of(page, size, Sort.by("name")));
    }

    /**
     * <p>Used to get a specific project from the database.
     * </p>
     * @param id  String used to specify which project to retrieve.
     * @return the project object that has the same id.
     * @throws RuntimeException If there is no project with the specified id.
     * @since 1.0
     */
    public Project getProject(String id){
        return projectRepo.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
    }

    /**
     * <p>Used to save projects to the database.
     * </p>
     * @param project A Project object used to save its data to the database.
     * @return the saved project entity.
     * @since 1.0
     */
    public Project createProject(Project project){
        return projectRepo.save(project);
    }

    /**
     * <p>Used to delete a specific project with the
     * same id from the database.
     * </p>
     * @param id String used to delete a project object with a specific id from the database.
     * @since 1.0
     */
    public void deleteProject(String id) {
        projectRepo.deleteById(id);
    }
}
