package com.soutLink.supervisor.dto;

import com.soutLink.enums.SummaryStatus;
import lombok.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SummaryResponse {
    private Long id;
    private SummaryStatus status;
    private List<ProjectResponse> projectList;
}
