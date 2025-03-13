package com.projectmanagement.projects.service;
import org.springframework.data.domain.Page;

import com.projectmanagement.projects.domain.Project;
import com.projectmanagement.projects.repo.ProjectRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepo projectRepo;

    public Page<Project> getAllProjects(int page, int size){
        return projectRepo.findAll(PageRequest.of(page, size, Sort.by("name")));
    }

    public Project getProject(String id){
        return projectRepo.findBy(id).orElseThrow(() -> new RuntimeException("Project not found"));
    }

    public Project createProject(Project project){
        return projectRepo.save(project);
    }

    public void deleteProject(String id) {
        projectRepo.deleteById(id);
    }
}
