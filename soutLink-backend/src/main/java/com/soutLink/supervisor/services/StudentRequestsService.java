package com.soutLink.supervisor.services;

import com.soutLink.enums.ProjectRequestStatus;
import com.soutLink.enums.ProjectStatus;
import com.soutLink.student.project.ProjectRequestHistory;
import com.soutLink.student.project.ProjectRequestHistoryRepository;
import com.soutLink.supervisor.dto.StudentRequestsResponse;
import com.soutLink.supervisor.mapper.StudentRequestMapper;
import com.soutLink.supervisor.project.Project;
import com.soutLink.supervisor.project.ProjectAcceptable;
import com.soutLink.supervisor.project.ProjectAcceptableRepository;
import com.soutLink.supervisor.project.ProjectRepository;
import com.soutLink.user.Student.Student;
import com.soutLink.user.Supervisor.Supervisor;
import com.soutLink.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentRequestsService {

    private final ProjectRequestHistoryRepository projectRequestHistoryRepository;
    private final StudentRequestMapper studentRequestMapper;
    private final ProjectRepository projectRepository;
    private final ProjectAcceptableRepository projectAcceptableRepository;

    public List<StudentRequestsResponse> getAllStudentRequests(Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Supervisor supervisor = (Supervisor) user;

        List<ProjectRequestHistory> projectRequests = projectRequestHistoryRepository.
                findAllByProjectSupervisorAndCompleteTrue(supervisor);
        return projectRequests.stream()
                .sorted(Comparator.comparing(ProjectRequestHistory::getLastModifiedDate).reversed())
                .map(studentRequestMapper::toStudentRequestsResponse)
                .collect(Collectors.toList());
    }

    public StudentRequestsResponse getStudentRequestsById(Long requestId, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Supervisor supervisor = (Supervisor) user;

        ProjectRequestHistory projectRequests = projectRequestHistoryRepository.
                findByIdAndProjectSupervisor(requestId, supervisor);
        return studentRequestMapper.toStudentRequestsResponse(projectRequests);
    }

    public void approveProjectRequest(Long requestId, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Supervisor supervisor = (Supervisor) user;

        ProjectRequestHistory acceptedRequest  = projectRequestHistoryRepository.
                findByIdAndProjectSupervisor(requestId, supervisor);
        acceptedRequest.setStatus(ProjectRequestStatus.ACCEPTED);
        acceptedRequest.setDescription(String.format(
                "The project request has been accepted by supervisor <strong>%s</strong>.",
                supervisor.getFullName()
        ));

        projectRequestHistoryRepository.save(acceptedRequest );

        // Add the owner and partners to the project's list of students
        Project project = acceptedRequest.getProject();
        List<Student> studentsToAdd = new ArrayList<>();
        studentsToAdd.add(acceptedRequest.getOwner());
        studentsToAdd.addAll(acceptedRequest.getPartners());

        for (Student student : studentsToAdd) {
            ProjectAcceptable projectAcceptable = ProjectAcceptable.builder()
                    .student(student)
                    .project(project)
                    .build();
            projectAcceptableRepository.save(projectAcceptable);
        }

        project.setStatus(ProjectStatus.ACCEPTED);
        projectRepository.save(project);

        // remove other requests from the same group
        List<Student> involvedStudents = new ArrayList<>();
        involvedStudents.add(acceptedRequest.getOwner());
        involvedStudents.addAll(acceptedRequest.getPartners());

        removeAllRequestsByGroup(involvedStudents, acceptedRequest);
        rejectedAllRequestHaveSameProjects(project);
        rejectedAllRequestConflict(involvedStudents);

    }

    public void rejectedProjectRequest(Long requestId, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Supervisor supervisor = (Supervisor) user;

        ProjectRequestHistory projectRequests = projectRequestHistoryRepository.
                findByIdAndProjectSupervisor(requestId, supervisor);
        projectRequests.setStatus(ProjectRequestStatus.REJECTED);
        projectRequestHistoryRepository.save(projectRequests);
    }

    public void removeAllRequestsByGroup(List<Student> involvedStudents, ProjectRequestHistory acceptedRequest) {
        List<ProjectRequestHistory> otherRequests = projectRequestHistoryRepository
                .findAllByStatusNotAndCompleteTrue(ProjectRequestStatus.ACCEPTED)
                .stream()
                .filter(request -> new HashSet<>(involvedStudents).containsAll(request.getPartners())
                        && involvedStudents.contains(request.getOwner()) &&
                        involvedStudents.size() == request.getPartners().size() + 1)
                .collect(Collectors.toList());

        projectRequestHistoryRepository.deleteAll(otherRequests);
    }

    public void rejectedAllRequestHaveSameProjects(Project project) {
        List<ProjectRequestHistory> conflictingRequests = projectRequestHistoryRepository
                .findAllByProjectAndStatusNot(project, ProjectRequestStatus.ACCEPTED)
                .stream()
                .toList();

        for (ProjectRequestHistory conflictingRequest : conflictingRequests) {
            conflictingRequest.setDescription(
                    "The project request has been <strong>rejected</strong> because another request for the same project has " +
                            "been " +
                            "approved by a different group."
            );
            conflictingRequest.setStatus(ProjectRequestStatus.REJECTED);
            projectRequestHistoryRepository.save(conflictingRequest);
        }
    }

    public void rejectedAllRequestConflict(List<Student> involvedStudents) {
        List<ProjectRequestHistory> conflictingRequests = projectRequestHistoryRepository
                .findAllByStatusNotAndCompleteTrue(ProjectRequestStatus.ACCEPTED)
                .stream()
                .filter(request -> request.getPartners().stream()
                        .anyMatch(involvedStudents::contains)
                        || involvedStudents.contains(request.getOwner()))
                .toList();

        for (ProjectRequestHistory conflictingRequest : conflictingRequests) {
            conflictingRequest.setDescription(
                    "The project request has been <strong>rejected</strong> because one or more students in the group are" +
                            " already committed to a project with another group."
            );
            conflictingRequest.setStatus(ProjectRequestStatus.REJECTED);
            projectRequestHistoryRepository.save(conflictingRequest);

        }
    }


}
