package com.soutLink.supervisor.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppointmentDetailsResponse {
    private StudentAppointmentResponse studentAppointment;
    private String projectTitle;
    private List<StudentResponse> students;
}
