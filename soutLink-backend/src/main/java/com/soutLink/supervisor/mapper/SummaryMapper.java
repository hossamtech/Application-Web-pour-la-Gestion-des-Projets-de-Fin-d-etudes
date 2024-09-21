package com.soutLink.supervisor.mapper;

import com.soutLink.supervisor.dto.ProjectResponse;
import com.soutLink.supervisor.project.Project;
import org.springframework.stereotype.Service;

@Service
public class SummaryMapper {

    public ProjectResponse toSummaryResponse(Project project) {
       return ProjectResponse.builder()
               .id(project.getId())
               .title(project.getTitle())
               .numberStudents(project.getNumberStudents())
               .description(project.getDescription())
               .build();
    }
}
