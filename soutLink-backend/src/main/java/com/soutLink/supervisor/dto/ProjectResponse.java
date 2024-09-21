package com.soutLink.supervisor.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProjectResponse {
    private Long id;
    private String title;
    private int numberStudents;
    private String description;
    private List<FileResponse> files;
}
