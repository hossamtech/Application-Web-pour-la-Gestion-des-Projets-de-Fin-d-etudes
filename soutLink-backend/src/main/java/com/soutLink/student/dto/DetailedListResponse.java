package com.soutLink.student.dto;
import com.soutLink.supervisor.dto.DetailedProjectResponse;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DetailedListResponse {
    private Long id;
    private List<DetailedProjectResponse> listProjects;
    private SupervisorProjectResponse supervisor;
    private LocalDateTime createdDate;
}
