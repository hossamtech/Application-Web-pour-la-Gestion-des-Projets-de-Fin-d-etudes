package com.soutLink.student.dto;

import com.soutLink.enums.ProjectRequestStatus;
import com.soutLink.supervisor.dto.StudentResponse;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProjectRequestResponse {

    private Long id;
    private String projectTitle;
    private int numberStudents;
    private ProjectRequestStatus status;
    private SupervisorProjectResponse supervisor;
    private List<StudentResponse> students;
    private String description;
    private String date;
}
