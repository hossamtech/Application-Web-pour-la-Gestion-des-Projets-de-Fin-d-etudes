package com.soutLink.supervisor.dto;

import com.soutLink.enums.ProjectRequestStatus;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentRequestsResponse {
    private Long id;
    private String projectTitle;
    private ProjectRequestStatus status;
    private List<StudentResponse> students;
    private String description;
    private String date;
}
