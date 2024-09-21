package com.soutLink.student.mapper;

import com.soutLink.student.appointments.RequestAppointments;
import com.soutLink.student.dto.AppointmentRequest;
import com.soutLink.student.dto.AppointmentRequestsResponse;
import com.soutLink.student.dto.SupervisorAppointmentResponse;
import com.soutLink.supervisor.appointment.SupervisorAppointment;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
public class AppointmentMapper {

    public RequestAppointments toRequestAppointments(AppointmentRequest request) {
        return RequestAppointments.builder()
                .id(request.id())
                .objet(request.objet())
                .description(request.description())
                .complete(false)
                .build();
    }

    public SupervisorAppointmentResponse toSupervisorAppointmentResponse(SupervisorAppointment supervisorAppointment) {
        return SupervisorAppointmentResponse.builder()
                .id(supervisorAppointment.getId())
                .subject(supervisorAppointment.getRequest().getObjet())
                .supervisorName(supervisorAppointment.getRequest().getSupervisor().getFullName())
                .status(supervisorAppointment.getStatus())
                .date(supervisorAppointment.getAppointmentDate())
                .time(supervisorAppointment.getAppointmentTime())
                .build();
    }

    public AppointmentRequestsResponse toAppointmentRequestsResponse (RequestAppointments requestAppointments) {
        return AppointmentRequestsResponse.builder()
                .id(requestAppointments.getId())
                .subject(requestAppointments.getObjet())
                .supervisorName(requestAppointments.getSupervisor().getFullName())
                .description(requestAppointments.getDescription())
                .complete(requestAppointments.isComplete())
                .date(requestAppointments.getCreatedDate().format(DateTimeFormatter.ofPattern("d, MMM")))
                .time(requestAppointments.getCreatedDate().format(DateTimeFormatter.ofPattern("HH:mm")))
                .build();
    }
}
