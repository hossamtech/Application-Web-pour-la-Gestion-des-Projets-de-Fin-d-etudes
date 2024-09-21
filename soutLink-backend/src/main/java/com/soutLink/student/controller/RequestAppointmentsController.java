package com.soutLink.student.controller;

import com.soutLink.student.dto.AppointmentRequest;
import com.soutLink.student.dto.AppointmentRequestsResponse;
import com.soutLink.student.dto.SupervisorAppointmentResponse;
import com.soutLink.student.services.ProjectRequestService;
import com.soutLink.student.services.RequestAppointmentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("etudiant")
@RequiredArgsConstructor
@Tag(name = "Request an appointment")
public class RequestAppointmentsController {

    private final RequestAppointmentService requestAppointmentService;

    @PostMapping("/save-appointmentRequest")
    public ResponseEntity<Long> saveAppointmentRequest(
            @Valid @RequestBody AppointmentRequest request,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(requestAppointmentService.save(request, connectedUser));
    }

    @GetMapping("/findSupervisorAppointment")
    public ResponseEntity<List<SupervisorAppointmentResponse>> findSupervisorAppointment(
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(requestAppointmentService.findSupervisorAppointment(connectedUser));
    }

    @GetMapping("/findRequestsByUser")
    public ResponseEntity<List<AppointmentRequestsResponse>> findRequestsByUser(
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(requestAppointmentService.findRequestsByUser(connectedUser));
    }

    @PatchMapping("/confirm-appointment/{appointment-id}")
    public ResponseEntity<?> confirmAppointment (
            @PathVariable("appointment-id") Long appointmentId
    ) {
        requestAppointmentService.confirmAppointment(appointmentId);
        return ResponseEntity.accepted().build();
    }

    @PatchMapping("/cancel-appointment/{appointment-id}")
    public ResponseEntity<?> cancelAppointment (
            @PathVariable("appointment-id") Long appointmentId
    ) {
        requestAppointmentService.cancelAppointment(appointmentId);
        return ResponseEntity.accepted().build();
    }
}
