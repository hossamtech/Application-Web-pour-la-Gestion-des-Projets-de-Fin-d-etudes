package com.soutLink.supervisor.mapper;

import com.soutLink.file.FileUtils;
import com.soutLink.student.appointments.RequestAppointments;
import com.soutLink.student.project.ProjectRequestHistory;
import com.soutLink.supervisor.appointment.SupervisorAppointment;
import com.soutLink.supervisor.dto.*;
import com.soutLink.supervisor.project.Project;
import com.soutLink.supervisor.project.ProjectAcceptable;
import com.soutLink.supervisor.project.ProjectAcceptableRepository;
import com.soutLink.user.Student.Student;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class StudentRequestMapper {

    private final ProjectAcceptableRepository projectAcceptableRepository;

    public StudentRequestsResponse toStudentRequestsResponse(ProjectRequestHistory request) {
        return StudentRequestsResponse.builder()
                .id(request.getId())
                .projectTitle(request.getProject().getTitle())
                .status(request.getStatus())
                .students(Stream.concat(
                        Stream.of(request.getOwner()).map(owner -> StudentResponse.builder()
                                .fullName(owner.getFullName())
                                .email(owner.getEmail())
                                .sector(owner.getSector())
                                .apogee(owner.getApogeeCode())
                                .profileImage(FileUtils.readFileFromLocation(owner.getProfileImg()))
                                .build()),
                        request.getPartners().stream()
                                .map(partner -> StudentResponse.builder()
                                        .fullName(partner.getFullName())
                                        .email(partner.getEmail())
                                        .sector(partner.getSector())
                                        .apogee(partner.getApogeeCode())
                                        .profileImage(FileUtils.readFileFromLocation(partner.getProfileImg()))
                                        .build())
                ).collect(Collectors.toList()))
                .description(request.getDescription())
                .date(request.getLastModifiedDate().format(DateTimeFormatter.ofPattern("d, MMMM yyyy")))
                .build();
    }

    public UpcomingAppointmentsResponse toUpcomingAppointmentsResponse(SupervisorAppointment appointment) {
        return UpcomingAppointmentsResponse.builder()
                .id(appointment.getId())
                .description(appointment.getRequest().getDescription())
                .objet(appointment.getRequest().getObjet())
                .student(getStudentsForProject(appointment))
                .appointmentDate(appointment.getAppointmentDate())
                .appointmentTime(appointment.getAppointmentTime())
                .build();
    }

    private List<StudentResponse> getStudentsForProject(SupervisorAppointment appointment) {

        Project project = appointment.getRequest().getProject();
        List<ProjectAcceptable> studentProject = projectAcceptableRepository.findAllByProject(project);
        return studentProject.stream()
                .map(projectAcceptable -> toStudentResponse(projectAcceptable.getStudent()))
                .collect(Collectors.toList());
    }

    public StudentAppointmentResponse toStudentAppointmentResponse(RequestAppointments requestAppointments) {

        return StudentAppointmentResponse.builder()
                .id(requestAppointments.getId())
                .objet(requestAppointments.getObjet())
                .description(requestAppointments.getDescription())
                .student(toStudentResponse(requestAppointments.getStudent()))
                .createdDate(requestAppointments.getCreatedDate().format(DateTimeFormatter.ofPattern("d, MMM yyyy")))
                .build();
    }

    public StudentResponse toStudentResponse(Student student) {
        return StudentResponse.builder()
                .fullName(student.getFullName())
                .email(student.getEmail())
                .sector(student.getSector())
                .apogee(student.getApogeeCode())
                .profileImage(FileUtils.readFileFromLocation(student.getProfileImg()))
                .build();
    }
}
