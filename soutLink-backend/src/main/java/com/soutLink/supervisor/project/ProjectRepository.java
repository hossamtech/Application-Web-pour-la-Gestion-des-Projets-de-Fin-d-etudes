package com.soutLink.supervisor.project;

import com.soutLink.enums.ProjectStatus;
import com.soutLink.enums.SummaryStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("SELECT project FROM Project project " +
            "JOIN project.listProject listproject " +
            "WHERE listproject.status = :listStatus " +
            "AND project.status = :projectStatus " +
            "AND project.supervisor.id = :supervisorId")
    Page<Project> findAllBySupervisorIdAndStatusProject(
            @Param("supervisorId") Long supervisorId,
            @Param("listStatus") SummaryStatus listStatus,
            @Param("projectStatus") ProjectStatus projectStatus,
            Pageable pageable);


    @Query("SELECT project FROM Project project " +
            "JOIN project.listProject listproject " +
            "WHERE listproject.status = :listStatus " +
            "AND project.supervisor.id = :supervisorId")
    Page<Project> findAllBySupervisorId(
            @Param("supervisorId") Long userId,
            @Param("listStatus") SummaryStatus listStatus,
            Pageable pageable);

    @Query("SELECT project FROM Project project " +
            "JOIN project.listProject listproject " +
            "WHERE listproject.id = :listProjectId " +
            "AND project.status = :projectStatus")
    Page<Project> findAllByListProjectIdAndStatusProject(
            @Param("listProjectId") Long listProjectId,
            @Param("projectStatus") ProjectStatus projectStatus,
            Pageable pageable);


    @Query("SELECT project FROM Project project " +
            "JOIN project.listProject listproject " +
            "WHERE listproject.id = :listProjectId")
    Page<Project> findAllByListProjectId(
            @Param("listProjectId") Long listProjectId,
            Pageable pageable);


    Optional<Project> findByIdAndSupervisorId(Long projectId, Long supervisorId);
}
