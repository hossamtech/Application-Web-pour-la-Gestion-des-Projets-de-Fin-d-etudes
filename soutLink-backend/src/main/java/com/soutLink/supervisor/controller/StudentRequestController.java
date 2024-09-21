package com.soutLink.supervisor.controller;

import com.soutLink.supervisor.dto.StudentRequestsResponse;
import com.soutLink.supervisor.services.StudentRequestsService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("encadrant")
@RequiredArgsConstructor
@Tag(name = "Student request for projects")
public class StudentRequestController {

    private final StudentRequestsService studentRequestsService;

    @GetMapping(value = "/student-requests")
    public ResponseEntity<List<StudentRequestsResponse>> getAllStudentRequests(
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(studentRequestsService.getAllStudentRequests(connectedUser));
    }

    @GetMapping(value = "/student-request/{request-id}")
    public ResponseEntity<StudentRequestsResponse> getStudentRequestsById(
            @PathVariable("request-id") Long requestId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(studentRequestsService.getStudentRequestsById(requestId, connectedUser));
    }

    @PatchMapping("/project-request/approve/{request-id}")
    public ResponseEntity<?> approveProjectRequest (
            @PathVariable("request-id") Long requestId,
            Authentication connectedUser
    ) {
        studentRequestsService.approveProjectRequest(requestId, connectedUser);
        return ResponseEntity.accepted().build();

    }

    @PatchMapping("/project-request/rejected/{request-id}")
    public ResponseEntity<?> rejectedProjectRequest (
            @PathVariable("request-id") Long requestId,
            Authentication connectedUser
    ) {
        studentRequestsService.rejectedProjectRequest(requestId, connectedUser);
        return ResponseEntity.accepted().build();
    }

}
