package com.soutLink.student.dto;

import com.soutLink.enums.AppointmentStatus;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SupervisorAppointmentResponse {
    private Long id;
    private String subject;
    private String supervisorName;
    private AppointmentStatus status;
    private String date;
    private String time;
}
