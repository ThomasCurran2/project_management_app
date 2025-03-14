package com.projectmanagement.projects.repo;

import com.projectmanagement.projects.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepo extends JpaRepository<Project, String> {
    Optional<Project> findById(String id);
}
