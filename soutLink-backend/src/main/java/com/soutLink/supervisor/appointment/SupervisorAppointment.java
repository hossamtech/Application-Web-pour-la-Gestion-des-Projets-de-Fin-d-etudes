package com.soutLink.supervisor.appointment;

import com.soutLink.enums.AppointmentStatus;
import com.soutLink.student.appointments.RequestAppointments;
import com.soutLink.user.Student.Student;
import com.soutLink.user.Supervisor.Supervisor;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "supervisor_appointments")
public class SupervisorAppointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id", nullable = false)
    private RequestAppointments request;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;

    private String appointmentDate;
    private String appointmentTime;

}
