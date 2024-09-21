package com.soutLink.student.project;

import com.soutLink.enums.ProjectRequestStatus;
import com.soutLink.enums.SummaryStatus;
import com.soutLink.supervisor.project.Project;
import com.soutLink.user.Student.Student;
import com.soutLink.user.Supervisor.Supervisor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRequestHistoryRepository extends JpaRepository<ProjectRequestHistory, Long> {

    List<ProjectRequestHistory> findAllByProjectSupervisorAndCompleteTrue(Supervisor supervisor);
    @Query("SELECT projectRequest FROM ProjectRequestHistory projectRequest " +
            "WHERE projectRequest.owner = :student " +
            "OR :student MEMBER OF projectRequest.partners")
    Page<ProjectRequestHistory> findAllByOwnerOrPartners(
            @Param("student") Student student,
            Pageable pageable);

    ProjectRequestHistory findByIdAndProjectSupervisor(Long id, Supervisor supervisor);
    Optional<ProjectRequestHistory> findByOwnerAndProjectAndStatus(Student owner, Project project, ProjectRequestStatus status);
    Optional<ProjectRequestHistory> findBySerialTrack(String serialTrack);

    List<ProjectRequestHistory> findAllByProjectAndStatusNot(Project project, ProjectRequestStatus status);
    List<ProjectRequestHistory> findAllByStatusNotAndCompleteTrue(ProjectRequestStatus status);

    long countByOwnerAndProjectSupervisor(Student owner, Supervisor supervisor);

    long countByPartnersAndProjectSupervisor(List<Student> partners, Supervisor project_supervisor);


}
