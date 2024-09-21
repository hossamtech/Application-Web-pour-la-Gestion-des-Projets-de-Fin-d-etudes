package com.soutLink.supervisor.project;

import com.soutLink.enums.ProjectStatus;
import com.soutLink.user.Student.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectAcceptableRepository extends JpaRepository<ProjectAcceptable, Long> {

    List<ProjectAcceptable> findByProject (Project project);
    ProjectAcceptable findByStudentAndProjectStatus(Student student, ProjectStatus status);
    List<ProjectAcceptable> findAllByProject(Project project);

}
