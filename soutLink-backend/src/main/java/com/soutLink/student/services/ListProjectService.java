package com.soutLink.student.services;

import com.soutLink.common.PageResponse;
import com.soutLink.enums.ProjectStatus;
import com.soutLink.enums.SummaryStatus;
import com.soutLink.student.dto.DetailedListResponse;
import com.soutLink.student.mapper.ListProjectMapper;
import com.soutLink.supervisor.dto.DetailedProjectResponse;
import com.soutLink.supervisor.mapper.ProjectMapper;
import com.soutLink.supervisor.project.*;
import com.soutLink.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ListProjectService {
    private final ListProjectsRepository listProjectsRepository;
    private final ListProjectMapper listProjectMapper;
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;


    public List<DetailedListResponse> findAllListsWithStatusPlaced() {
        Sort sort = Sort.by("createdDate").ascending();
        List<ListProjects> listProjects = listProjectsRepository.findAllByStatus(SummaryStatus.Posted, sort);

        return listProjects.stream()
                .map(listProjectMapper::toDetailedListResponse)
                .toList();
    }

    public PageResponse<DetailedProjectResponse> findListProjectByListId(int page, int size, ProjectStatus status,
                                                                            Long listProjectId) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").ascending());
        Page<Project> projects;

        if (status != null) {
            projects = projectRepository.findAllByListProjectIdAndStatusProject(listProjectId, status, pageable);
        } else {
            projects = projectRepository.findAllByListProjectId(listProjectId, pageable);
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

    public DetailedProjectResponse overviewProjectFromStudentById(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("No project found with the ID: " + projectId));

        return projectMapper.toDetailedProjectResponse(project);
    }

}
