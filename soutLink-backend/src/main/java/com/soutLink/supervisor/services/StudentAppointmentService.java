package com.soutLink.supervisor.services;

import com.soutLink.common.PageResponse;
import com.soutLink.enums.AppointmentStatus;
import com.soutLink.enums.SummaryStatus;
import com.soutLink.student.appointments.RequestAppointmentRepository;
import com.soutLink.student.appointments.RequestAppointments;
import com.soutLink.supervisor.appointment.SupervisorAppointment;
import com.soutLink.supervisor.appointment.SupervisorAppointmentRepository;
import com.soutLink.supervisor.dto.*;
import com.soutLink.supervisor.mapper.StudentRequestMapper;
import com.soutLink.supervisor.project.Project;
import com.soutLink.supervisor.project.ProjectAcceptable;
import com.soutLink.supervisor.project.ProjectAcceptableRepository;
import com.soutLink.user.Supervisor.Supervisor;
import com.soutLink.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentAppointmentService {

    private final ProjectAcceptableRepository projectAcceptableRepository;
    private final RequestAppointmentRepository appointmentRepository;
    private final SupervisorAppointmentRepository supervisorAppointmentRepository;
    private final StudentRequestMapper studentRequestMapper;

    public PageResponse<StudentAppointmentResponse> findStudentAppointment(int page, int size, AppointmentStatus status,
                                                    Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Supervisor supervisor = (Supervisor) user;

        List<StudentAppointmentResponse> studentAppointmentResponseList;

        if (status == AppointmentStatus.WAITING) {
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").ascending());

            Page<RequestAppointments> requestAppointments =
                    appointmentRepository.findAllBySupervisorAndCompleteFalse(supervisor,
                    pageable);

            studentAppointmentResponseList = requestAppointments.stream()
                    .map(request -> {
                        StudentAppointmentResponse response = studentRequestMapper.toStudentAppointmentResponse(request);
                        response.setStatus(AppointmentStatus.WAITING);
                        return response;
                    })
                    .collect(Collectors.toList());

            return createPageResponse(studentAppointmentResponseList, requestAppointments);
        } else {
            Pageable pageable = PageRequest.of(page, size, Sort.by("appointmentDate").ascending());
            Page<SupervisorAppointment> supervisorAppointments = supervisorAppointmentRepository.findByRequestSupervisorAndStatus(supervisor,
                    status, pageable);

            studentAppointmentResponseList = supervisorAppointments.stream()
                    .map(supervisorAppointment -> {
                        StudentAppointmentResponse response = studentRequestMapper.toStudentAppointmentResponse(supervisorAppointment.getRequest());
                        response.setStatus(supervisorAppointment.getStatus());
                        response.setAppointmentDate(supervisorAppointment.getAppointmentDate());
                        response.setAppointmentTime(supervisorAppointment.getAppointmentTime());
                        return response;
                    })
                    .toList();

            return createPageResponse(studentAppointmentResponseList, supervisorAppointments);
        }
    }

//    public List<StudentAppointmentResponse> findWaitingAppointments(Authentication connectedUser) {
//        User user = ((User) connectedUser.getPrincipal());
//        Supervisor supervisor = (Supervisor) user;
//
//        List<StudentAppointmentResponse> studentAppointmentResponseList;
//
//            List<RequestAppointments> requestAppointments =
//                    appointmentRepository.findAllBySupervisorAndCompleteFalse(supervisor);
//
//        return requestAppointments.stream()
//                .map(studentRequestMapper::toStudentAppointmentResponse)
//                .toList();
//    }

    public List<StudentAppointmentResponse> findWaitingAppointments(Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Supervisor supervisor = (Supervisor) user;

        List<RequestAppointments> requestAppointments = appointmentRepository.findAllBySupervisorAndCompleteFalse(supervisor);

        return requestAppointments.stream()
                .map(request -> {
                    Optional<SupervisorAppointment> supervisorAppointmentOptional =
                            supervisorAppointmentRepository.findByRequest(request);

                    StudentAppointmentResponse response = studentRequestMapper.toStudentAppointmentResponse(request);

                    if (supervisorAppointmentOptional.isPresent()) {
                        SupervisorAppointment supervisorAppointment = supervisorAppointmentOptional.get();
                        response.setStatus(supervisorAppointment.getStatus());
                        response.setAppointmentDate(supervisorAppointment.getAppointmentDate());
                        response.setAppointmentTime(supervisorAppointment.getAppointmentTime());
                    } else {
                        response.setStatus(AppointmentStatus.WAITING);
                    }

                    return response;
                })
                .collect(Collectors.toList());
    }


    private <T> PageResponse<T> createPageResponse(List<T> content, Page<?> page) {
        return new PageResponse<>(
                content,
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isFirst(),
                page.isLast()
        );
    }

    public AppointmentDetailsResponse getStudentAppointmentDetails(Long requestId, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Supervisor supervisor = (Supervisor) user;

        RequestAppointments requestAppointments = appointmentRepository.findByIdAndSupervisor(requestId, supervisor)
                .orElseThrow(() -> new EntityNotFoundException("No request found with the ID: " + requestId));

        Project project = requestAppointments.getProject();

        List<ProjectAcceptable> studentProject =  projectAcceptableRepository.findAllByProject(project);
        List<StudentResponse> projectGroup = studentProject.stream()
                .map(projectAcceptable -> studentRequestMapper.toStudentResponse(projectAcceptable.getStudent()))
                .toList();

        StudentAppointmentResponse response = studentRequestMapper.toStudentAppointmentResponse(requestAppointments);
        response.setStatus(AppointmentStatus.WAITING);

        Optional<SupervisorAppointment> supervisorAppointments = supervisorAppointmentRepository.findByRequestId(requestId);

        if (supervisorAppointments.isPresent()) {
            response = studentRequestMapper.toStudentAppointmentResponse(supervisorAppointments.get().getRequest());
            response.setStatus(supervisorAppointments.get().getStatus());
            response.setAppointmentDate(supervisorAppointments.get().getAppointmentDate());
            response.setAppointmentTime(supervisorAppointments.get().getAppointmentTime());
        }
        return AppointmentDetailsResponse.builder()
                .studentAppointment(response)
                .projectTitle(project.getTitle())
                .students(projectGroup)
                .build();
    }

    public Long saveSupervisorAppointment(Long requestId, SupervisorAppointmentRequest request, Authentication connectedUser) {

        User user = ((User) connectedUser.getPrincipal());
        Supervisor supervisor = (Supervisor) user;

        RequestAppointments requestAppointments = appointmentRepository.findByIdAndSupervisor(requestId, supervisor)
                .orElseThrow(() -> new EntityNotFoundException("No request found with the ID: " + requestId));

        SupervisorAppointment supervisorAppointment = SupervisorAppointment.builder()
                .id(request.id())
                .appointmentDate(request.date())
                .appointmentTime(request.time())
                .build();
        supervisorAppointment.setRequest(requestAppointments);
        supervisorAppointment.setStatus(AppointmentStatus.PENDING);

        return supervisorAppointmentRepository.save(supervisorAppointment).getId();
    }


    public List<UpcomingAppointmentsResponse> findAcceptedAppointmentsByDate(Authentication connectedUser, String date) {
        User user = ((User) connectedUser.getPrincipal());
        Supervisor supervisor = (Supervisor) user;
//        String standardDate = convertFrenchDateToEnglishFormat(date);


        List<SupervisorAppointment> supervisorAppointments =
                supervisorAppointmentRepository.findByRequestSupervisorAndStatusAndAppointmentDate(supervisor,
                        AppointmentStatus.ACCEPTED, date);

        return supervisorAppointments.stream()
                .map(studentRequestMapper::toUpcomingAppointmentsResponse)
                .collect(Collectors.toList());
    }

//    public static String convertFrenchDateToEnglishFormat(String frenchDate) {
//        try {
//            DateTimeFormatter frenchFormatter = DateTimeFormatter.ofPattern("d MMMM yyyy", Locale.FRENCH);
//            DateTimeFormatter englishFormatter = DateTimeFormatter.ofPattern("MMMM d, yyyy", Locale.ENGLISH);
//
//            LocalDate date = LocalDate.parse(frenchDate, frenchFormatter);
//
//            return date.format(englishFormatter);
//        } catch (DateTimeParseException e) {
//            throw new IllegalArgumentException("Invalid date format", e);
//        }
//    }
}
