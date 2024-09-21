package com.soutLink.student.services;

import com.soutLink.common.PageResponse;
import com.soutLink.enums.ProjectRequestStatus;
import com.soutLink.enums.ProjectStatus;
import com.soutLink.exception.InvalidProjectRequestException;
import com.soutLink.file.FileUtils;
import com.soutLink.student.dto.AppointmentRequest;
import com.soutLink.student.dto.Participant;
import com.soutLink.student.dto.ParticipantsResponse;
import com.soutLink.student.dto.ProjectRequestResponse;
import com.soutLink.student.mapper.ProjectRequestMapper;
import com.soutLink.student.project.ProjectRequestHistory;
import com.soutLink.student.project.ProjectRequestHistoryRepository;
import com.soutLink.supervisor.project.Project;
import com.soutLink.supervisor.project.ProjectAcceptable;
import com.soutLink.supervisor.project.ProjectAcceptableRepository;
import com.soutLink.supervisor.project.ProjectRepository;
import com.soutLink.user.Student.Student;
import com.soutLink.user.Supervisor.Supervisor;
import com.soutLink.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectRequestService {

    private final ProjectRepository projectRepository;
    private final ProjectRequestHistoryRepository projectRequestHistoryRepository;
    private final ProjectAcceptableRepository projectAcceptableRepository;
    private final ProjectRequestMapper projectRequestMapper;
    private static final int MAX_REQUESTS = 3; // Maximum number of requests allowed

    public String projectRequestById(Authentication connectedUser, Long projectId) {
        User user = ((User) connectedUser.getPrincipal());
        Student student = (Student) user;

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new InvalidProjectRequestException("No project found with the ID: " + projectId));

        Supervisor supervisor = project.getSupervisor();
        long requestsByOwner = projectRequestHistoryRepository.countByOwnerAndProjectSupervisor(student, supervisor);
        long requestsByPartner = projectRequestHistoryRepository.countByPartnersAndProjectSupervisor(
                (List<Student>) Collections.singletonList(student),
                supervisor
        );        long totalRequest = requestsByPartner + requestsByOwner;

        if (totalRequest >= MAX_REQUESTS) {
            throw new InvalidProjectRequestException("You have already requested or partnered in the maximum number of projects for this supervisor.");
        }

        Optional<ProjectRequestHistory> existingRequest = projectRequestHistoryRepository.findByOwnerAndProjectAndStatus(student,
                project, ProjectRequestStatus.PENDING);
        if (existingRequest.isPresent()) {
            throw new InvalidProjectRequestException("You have already submitted a request for this project.");
        }


        ProjectRequestHistory projectRequestHistory = ProjectRequestHistory.builder()
                .owner(student)
                .numberStudents(project.getNumberStudents())
                .project(project)
                .status(ProjectRequestStatus.PENDING)
                .serialTrack(project.getNumberStudents() == 1 ? null : UUID.randomUUID().toString())
                .complete(project.getNumberStudents() == 1)
                .description("Your project request is currently <strong>pending.</strong> " +
                        "Please wait for approval from your supervisor. " +
                        "You will be notified once a decision is made.")
                .build();

        project.setStatus(ProjectStatus.IN_PROGRESS);
        projectRepository.save(project);

        projectRequestHistoryRepository.save(projectRequestHistory);
        return projectRequestHistory.getSerialTrack();
    }

    public void requestProjectByPartners(Authentication connectedUser, Long projectId, String serialTrack) {
        User user = ((User) connectedUser.getPrincipal());
        Student student = (Student) user;

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new InvalidProjectRequestException("No project found with the ID: " + projectId));

        ProjectRequestHistory projectRequestHistory = projectRequestHistoryRepository.findBySerialTrack(serialTrack)
                .orElseThrow(() -> new InvalidProjectRequestException("No project request found with the serial track: " + serialTrack));

        if (!projectRequestHistory.getProject().equals(project)) {
            throw new InvalidProjectRequestException("The serial track does not match the given project ID.");
        }

        if (projectRequestHistory.getOwner().getId().equals(student.getId())) {
            throw new InvalidProjectRequestException("You have already submitted a request for this project.");
        }

        boolean isAlreadyPartner = projectRequestHistory.getPartners().stream()
                .anyMatch(partner -> partner.getId().equals(student.getId()));

        if (isAlreadyPartner) {
            throw new InvalidProjectRequestException("You have already requested to join this project.");
        }

        if (projectRequestHistory.isComplete()) {
            throw new InvalidProjectRequestException("The request for this project is already full.");
        }


        Supervisor supervisor = project.getSupervisor();

        long requestsByOwner = projectRequestHistoryRepository.countByOwnerAndProjectSupervisor(student, supervisor);
        long requestsByPartner = projectRequestHistoryRepository.countByPartnersAndProjectSupervisor(
                (List<Student>) Collections.singletonList(student),
                supervisor
        );        long totalRequest = requestsByPartner + requestsByOwner;

        if (totalRequest >= MAX_REQUESTS) {
            throw new InvalidProjectRequestException("You have already requested or partnered in the maximum number of projects for this supervisor.");
        }

        projectRequestHistory.getPartners().add(student);

        if (projectRequestHistory.getPartners().size() + 1 == project.getNumberStudents()) {
            projectRequestHistory.setComplete(true);
        }

        projectRequestHistoryRepository.save(projectRequestHistory);
    }

    public ParticipantsResponse getParticipants(String serialTrack) {
        ProjectRequestHistory projectRequestHistory = projectRequestHistoryRepository.findBySerialTrack(serialTrack)
                .orElseThrow(() -> new EntityNotFoundException("No project request found with the serial track: " + serialTrack));

        Student owner = projectRequestHistory.getOwner();
        List<Student> partners = projectRequestHistory.getPartners();

        return ParticipantsResponse.builder()
                .owner(Participant.builder()
                        .fullName(owner.getFullName())
                        .profileImage(FileUtils.readFileFromLocation(owner.getProfileImg()))
                        .build())
                .partners(partners.stream()
                        .map(partner -> Participant.builder()
                                .fullName(partner.getFullName())
                                .profileImage(FileUtils.readFileFromLocation(partner.getProfileImg()))
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    public boolean checkAcceptedProject(Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Student student = (Student) user;

        ProjectAcceptable acceptedProject = projectAcceptableRepository
                .findByStudentAndProjectStatus(student, ProjectStatus.ACCEPTED);

        return acceptedProject != null;
    }

    public PageResponse<ProjectRequestResponse> getAllProjectRequests(int page, int size, Authentication connectedUser) {

        User user = ((User) connectedUser.getPrincipal());
        Student student = (Student) user;

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").ascending());
        Page<ProjectRequestHistory> projectRequests = projectRequestHistoryRepository.
                findAllByOwnerOrPartners(student, pageable);

        List<ProjectRequestResponse> listProjectRequests = projectRequests.stream()
                .map(projectRequestMapper::toStudentRequestsResponse)
                .toList();

        return new PageResponse<>(
                listProjectRequests,
                projectRequests.getNumber(),
                projectRequests.getSize(),
                projectRequests.getTotalElements(),
                projectRequests.getTotalPages(),
                projectRequests.isFirst(),
                projectRequests.isLast()
        );
    }

}
