package com.soutLink.student.mapper;

import com.soutLink.file.FileUtils;
import com.soutLink.student.dto.DetailedListResponse;
import com.soutLink.student.dto.SupervisorProjectResponse;
import com.soutLink.supervisor.dto.DetailedProjectResponse;
import com.soutLink.supervisor.mapper.ProjectMapper;
import com.soutLink.supervisor.project.ListProjects;
import com.soutLink.user.Supervisor.Supervisor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ListProjectMapper {

    private final ProjectMapper projectMapper;


    public DetailedListResponse toDetailedListResponse(ListProjects listProjects) {
        List<DetailedProjectResponse> detailedProjects = listProjects.getListProject().stream()
                .map(projectMapper::toDetailedProjectResponse)
                .toList();


        return DetailedListResponse.builder()
                .id(listProjects.getId())
                .listProjects(detailedProjects)
                .supervisor(ToSupervisorResponse(listProjects.getSupervisor()))
                .createdDate(listProjects.getCreatedDate())
                .build();
    }

    private SupervisorProjectResponse ToSupervisorResponse(Supervisor supervisor) {
        return SupervisorProjectResponse.builder()
                .fullName(supervisor.getFullName())
                .email(supervisor.getUsername())
                .profileImg(FileUtils.readFileFromLocation(supervisor.getProfileImg()))
                .department(supervisor.getDepartment())
                .build();
    }
}
