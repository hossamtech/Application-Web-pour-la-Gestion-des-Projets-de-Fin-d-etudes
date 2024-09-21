package com.soutLink.student.services;

import com.soutLink.student.dto.ProjectDriveLinkRequest;
import com.soutLink.student.project.ProjectDriveLink;
import com.soutLink.student.project.ProjectDriveLinkRepository;
import com.soutLink.supervisor.project.Project;
import com.soutLink.supervisor.project.ProjectRepository;
import com.soutLink.user.User;
import com.soutLink.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;


@Service
@RequiredArgsConstructor
public class ProjectDriveLinkService {
    private final ProjectDriveLinkRepository projectDriveLinkRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public Long createMessage(ProjectDriveLinkRequest request, Authentication connectedUser) {

        User user = ((User) connectedUser.getPrincipal());
        Project project = projectRepository.findById(request.projectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        ProjectDriveLink driveLink = ProjectDriveLink.builder()
                .message(request.message())
                .driveLink(request.driveLink())
                .project(project)
                .sender(user)
                .build();

        return projectDriveLinkRepository.save(driveLink).getId();
    }
}
