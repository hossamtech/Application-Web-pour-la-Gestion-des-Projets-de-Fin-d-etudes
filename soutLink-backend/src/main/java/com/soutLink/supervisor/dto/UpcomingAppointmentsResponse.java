package com.soutLink.supervisor.dto;

import com.soutLink.enums.AppointmentStatus;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpcomingAppointmentsResponse {
    private Long id;
    private String description;
    private String objet;
    private List<StudentResponse> student;
    private String appointmentDate;
    private String appointmentTime;
}
