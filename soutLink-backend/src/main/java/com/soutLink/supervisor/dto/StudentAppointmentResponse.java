package com.soutLink.supervisor.dto;

import com.soutLink.enums.AppointmentStatus;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentAppointmentResponse {
    private Long id;
    private String description;
    private AppointmentStatus status;
    private String objet;
    private StudentResponse student;
    private String createdDate;
    private String appointmentDate;
    private String appointmentTime;
}
