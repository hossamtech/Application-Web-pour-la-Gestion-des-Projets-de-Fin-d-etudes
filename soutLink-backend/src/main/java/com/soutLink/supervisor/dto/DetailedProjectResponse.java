package com.soutLink.supervisor.dto;

import com.soutLink.auth.UserDetailsResponse;
import com.soutLink.enums.ProjectStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DetailedProjectResponse {
    private Long id;
    private String title;
    private String description;
    private int numberStudents;
    private ProjectStatus status;
    private SupervisorResponse supervisor;
    private List<UserDetailsResponse> students;
    private List<FileResponse> files;
    private String createdDate;
}
