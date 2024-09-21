package com.soutLink.supervisor.controller;

import com.soutLink.common.PageResponse;
import com.soutLink.enums.AppointmentStatus;
import com.soutLink.enums.ProjectStatus;
import com.soutLink.student.dto.AppointmentRequest;
import com.soutLink.supervisor.dto.*;
import com.soutLink.supervisor.services.StudentAppointmentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("encadrant")
@RequiredArgsConstructor
@Tag(name = "Appointment Request for student")
public class StudentAppointmentController {

    private final StudentAppointmentService studentAppointmentService;

    @GetMapping("/getStudentAppointment")
    public ResponseEntity<PageResponse<StudentAppointmentResponse>> findStudentAppointment(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            @RequestParam(name = "status", required = false) AppointmentStatus status,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(studentAppointmentService.findStudentAppointment(page, size, status, connectedUser));
    }

    @GetMapping("/getStudentAppointment-waiting")
    public ResponseEntity<List<StudentAppointmentResponse>> findWaitingAppointments(
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(studentAppointmentService.findWaitingAppointments(connectedUser));
    }

    @GetMapping("/findAcceptedAppointmentsByDate")
    public ResponseEntity<List<UpcomingAppointmentsResponse>> findAcceptedAppointmentsByDate(
            @RequestParam("date") String date,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(studentAppointmentService.findAcceptedAppointmentsByDate(connectedUser, date));
    }

    @GetMapping("/studentAppointment-details/{request-id}")
    public ResponseEntity<AppointmentDetailsResponse> getStudentAppointmentDetails(
            @PathVariable("request-id") Long requestId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(studentAppointmentService.getStudentAppointmentDetails(requestId, connectedUser));
    }

    @PostMapping("/save-supervisor-appointment/{request-id}")
    public ResponseEntity<Long> saveSupervisorAppointment(
            @Valid @RequestBody SupervisorAppointmentRequest request,
            @PathVariable("request-id") Long requestId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(studentAppointmentService.saveSupervisorAppointment(requestId, request, connectedUser));
    }
}
