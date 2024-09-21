package com.soutLink.student.project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectDriveLinkRepository extends JpaRepository<ProjectDriveLink, Long> {

}
