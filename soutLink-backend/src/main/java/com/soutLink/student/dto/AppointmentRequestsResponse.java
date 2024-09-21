package com.soutLink.student.dto;

import com.soutLink.enums.AppointmentStatus;
import com.soutLink.enums.ProjectRequestStatus;
import com.soutLink.supervisor.dto.StudentResponse;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppointmentRequestsResponse {
    private Long id;
    private String subject;
    private String description;
    private String supervisorName;
    private boolean complete;
    private String date;
    private String time;
}
