package com.soutLink.supervisor.services;

import com.soutLink.common.PageResponse;
import com.soutLink.enums.FileStatus;
import com.soutLink.enums.ProjectStatus;
import com.soutLink.enums.SummaryStatus;
import com.soutLink.file.FileStorageService;
import com.soutLink.supervisor.dto.DetailedProjectResponse;
import com.soutLink.supervisor.dto.ProjectRequest;
import com.soutLink.supervisor.dto.ProjectResponse;
import com.soutLink.supervisor.dto.SummaryResponse;
import com.soutLink.supervisor.mapper.ProjectMapper;
import com.soutLink.supervisor.mapper.SummaryMapper;
import com.soutLink.supervisor.project.*;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectMapper projectMapper;
    private final SummaryMapper summaryMapper;
    private final ProjectRepository projectRepository;
    private final FileStorageService fileStorageService;
    private final ListProjectsRepository listProjectsRepository;
    private final FileRepository fileRepository;


    public Long save(ProjectRequest request, Authentication connectedUser) {
        User user =  ((User) connectedUser.getPrincipal());
        Supervisor supervisor = (Supervisor) user;

        ListProjects activeListProject = listProjectsRepository.findBySupervisorIdAndStatus(supervisor.getId(),
                SummaryStatus.Pending);

        Project project = projectMapper.toProject(request);
        project.setSupervisor(supervisor);
        project.setListProject(activeListProject);

        Project createdProject = projectRepository.save(project);

        if (request.id() == null) {
            activeListProject.getListProject().add(project);
            listProjectsRepository.save(activeListProject);
        }

        return createdProject.getId();
    }


    public SummaryResponse getSummaryByUserId(Authentication connectedUser) {
        User user =  ((User) connectedUser.getPrincipal());
        Supervisor supervisor = (Supervisor) user;
        ListProjects activeListProject = listProjectsRepository.findBySupervisorIdAndStatus(supervisor.getId(),
                SummaryStatus.Pending);

        List<ProjectResponse> projectList = activeListProject.getListProject().stream()
                .map(summaryMapper::toSummaryResponse)
                .toList();

        return new SummaryResponse(
                activeListProject.getId(),
                activeListProject.getStatus(),
                projectList
        );
    }

    public ProjectResponse findById(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("No project found with the ID: " + projectId));

        project.setFiles(
                project.getFiles().stream()
                        .filter(file -> file.getStatus() == FileStatus.ACTIVE)
                        .collect(Collectors.toList())
        );

        return projectMapper.toProjectResponse(project);
    }

    @Transactional
    public void uploadFilesProject(List<MultipartFile> files, Authentication connectedUser, Long projectId) {
        User user =  ((User) connectedUser.getPrincipal());
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("No project found with the ID: " + projectId));

        String folderName = "project_" + projectId;
        for (MultipartFile file : files) {
            String fileName = file.getOriginalFilename();

            if ("blob".equals(fileName)) {
                continue;
            }

            File createdFile = File.builder()
                    .fileName(fileName)
                    .fileType(file.getContentType())
                    .status(FileStatus.ACTIVE)
                    .size(file.getSize())
                    .project(project)
                    .build();

            String filePath = fileStorageService.saveFile(file, user, folderName);
            createdFile.setFilePath(filePath);

            fileRepository.save(createdFile);
            project.getFiles().add(createdFile);

        }
        projectRepository.save(project);
    }

    @Transactional
    public void deleteFileById(List<Long> fileId) {
        for (Long id: fileId ) {
            File file = fileRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("No file found with the ID: " + id));

            file.setStatus(FileStatus.DELETED);
            fileRepository.save(file);
        }
    }

    public void placeListProjects(Authentication connectedUser) {
        User user =  ((User) connectedUser.getPrincipal());
        Supervisor supervisor = (Supervisor) user;

        ListProjects activeListProject = listProjectsRepository.findBySupervisorIdAndStatus(supervisor.getId(),
                SummaryStatus.Pending);

        activeListProject.setStatus(SummaryStatus.Posted);

        var newListProject = ListProjects.builder()
                .status(SummaryStatus.Pending)
                .supervisor(supervisor)
                .build();
        listProjectsRepository.save(newListProject);

    }

    public PageResponse<DetailedProjectResponse> findAllProjectBySupervisor(int page, int size, ProjectStatus status, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").ascending());
        Page<Project> projects;

        if (status != null) {
            projects = projectRepository.findAllBySupervisorIdAndStatusProject(user.getId(), SummaryStatus.Posted ,status, pageable);
        } else {
            projects = projectRepository.findAllBySupervisorId(user.getId(), SummaryStatus.Posted, pageable);
        }

        List<DetailedProjectResponse> detailedProjectResponseList = projects.stream()
                .map(projectMapper::toDetailedProjectResponse)
                .toList();

        return new PageResponse<>(
                detailedProjectResponseList,
                projects.getNumber(),
                projects.getSize(),
                projects.getTotalElements(),
                projects.getTotalPages(),
                projects.isFirst(),
                projects.isLast()
        );
    }

    public DetailedProjectResponse overviewProjectById(Long projectId, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Project project = projectRepository.findByIdAndSupervisorId(projectId, user.getId())
                .orElseThrow(() -> new EntityNotFoundException("No project found with the ID: " + projectId));

        return projectMapper.toDetailedProjectResponse(project);
    }
}
