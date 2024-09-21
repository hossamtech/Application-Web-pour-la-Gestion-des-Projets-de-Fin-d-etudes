package com.soutLink.student.services;

import com.soutLink.enums.AppointmentStatus;
import com.soutLink.enums.ProjectStatus;
import com.soutLink.student.appointments.RequestAppointmentRepository;
import com.soutLink.student.appointments.RequestAppointments;
import com.soutLink.student.dto.AppointmentRequest;
import com.soutLink.student.dto.AppointmentRequestsResponse;
import com.soutLink.student.dto.ProjectRequestResponse;
import com.soutLink.student.dto.SupervisorAppointmentResponse;
import com.soutLink.student.mapper.AppointmentMapper;
import com.soutLink.supervisor.appointment.SupervisorAppointment;
import com.soutLink.supervisor.appointment.SupervisorAppointmentRepository;
import com.soutLink.supervisor.project.Project;
import com.soutLink.supervisor.project.ProjectAcceptable;
import com.soutLink.supervisor.project.ProjectAcceptableRepository;
import com.soutLink.user.Student.Student;
import com.soutLink.user.Supervisor.Supervisor;
import com.soutLink.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RequestAppointmentService {

    private final AppointmentMapper appointmentMapper;
    private final ProjectAcceptableRepository projectAcceptableRepository;
    private final RequestAppointmentRepository requestAppointmentRepository;
    private final SupervisorAppointmentRepository supervisorAppointmentRepository;

    public Long save(AppointmentRequest request, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Student student = (Student) user;

        RequestAppointments requestAppointments = appointmentMapper.toRequestAppointments(request);
        requestAppointments.setStudent(student);

        ProjectAcceptable projectAcceptable = projectAcceptableRepository.findByStudentAndProjectStatus(student,
                ProjectStatus.ACCEPTED);

        Project project = projectAcceptable.getProject();
        requestAppointments.setProject(project);

        Supervisor supervisor = project.getSupervisor();
        requestAppointments.setSupervisor(supervisor);

        return requestAppointmentRepository.save(requestAppointments).getId();
    }

    public List<SupervisorAppointmentResponse> findSupervisorAppointment(Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Student student = (Student) user;

        List<SupervisorAppointment> supervisorAppointmentList =
                supervisorAppointmentRepository.findAllByRequestStudent(student);

        return supervisorAppointmentList.stream()
                .map(appointmentMapper::toSupervisorAppointmentResponse)
                .toList();
    }

    public List<AppointmentRequestsResponse> findRequestsByUser(Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Student student = (Student) user;

        List<RequestAppointments> supervisorAppointmentList =
                requestAppointmentRepository.findByStudent(student);

        return supervisorAppointmentList.stream()
                .map(appointmentMapper::toAppointmentRequestsResponse)
                .toList();
    }

    public void confirmAppointment(Long appointmentId) {
        SupervisorAppointment supervisorAppointment = supervisorAppointmentRepository.findById(appointmentId)
                        .orElseThrow(() -> new EntityNotFoundException("No appointment found with ID: " + appointmentId));

        RequestAppointments request =  supervisorAppointment.getRequest();
        request.setComplete(true);
        requestAppointmentRepository.save(request);

        supervisorAppointment.setStatus(AppointmentStatus.ACCEPTED);
        supervisorAppointmentRepository.save(supervisorAppointment);
    }

    public void cancelAppointment(Long appointmentId) {
        SupervisorAppointment supervisorAppointment = supervisorAppointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new EntityNotFoundException("No appointment found with ID: " + appointmentId));

        RequestAppointments request =  supervisorAppointment.getRequest();
        request.setComplete(true);
        requestAppointmentRepository.save(request);

        supervisorAppointment.setStatus(AppointmentStatus.CANCELED);
        supervisorAppointmentRepository.save(supervisorAppointment);
    }


}
