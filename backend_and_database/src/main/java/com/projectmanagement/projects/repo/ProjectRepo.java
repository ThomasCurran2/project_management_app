package com.projectmanagement.projects.repo;

import com.projectmanagement.projects.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * ProjectRepo is used to set up JPA functionality
 * and declare a method used in the ProjectResource file.
 * @author Thomas Curran
 *
 */
@Repository
public interface ProjectRepo extends JpaRepository<Project, String> {
    Optional<Project> findById(String id);
}
