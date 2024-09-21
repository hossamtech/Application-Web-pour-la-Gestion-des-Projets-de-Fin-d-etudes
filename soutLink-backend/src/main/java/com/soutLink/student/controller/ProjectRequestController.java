package com.soutLink.student.controller;

import com.soutLink.common.PageResponse;
import com.soutLink.enums.ProjectStatus;
import com.soutLink.student.dto.ParticipantsResponse;
import com.soutLink.student.dto.ProjectRequestResponse;
import com.soutLink.student.services.ProjectRequestService;
import com.soutLink.supervisor.dto.StudentRequestsResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("etudiant")
@RequiredArgsConstructor
@Tag(name = "Project Request History")
public class ProjectRequestController {

    private final ProjectRequestService projectRequestService;

    @PostMapping(value = "/projectRequest/{project-id}")
    public ResponseEntity<Map<String, String>> projectRequestById(
            @PathVariable("project-id") Long projectId,
            Authentication connectedUser
    ) {
        String serialTrack = projectRequestService.projectRequestById(connectedUser, projectId);
        Map<String, String> response = new HashMap<>();
        response.put("serialTrack", serialTrack);
        return ResponseEntity.ok(response);

    }

    @PostMapping(value = "/projectRequest/{project-id}/{serial-track}")
    public ResponseEntity<?> requestProjectByPartners(
            @PathVariable("project-id") Long projectId,
            @PathVariable("serial-track") String serialTrack,
            Authentication connectedUser
    ) {
        projectRequestService.requestProjectByPartners(connectedUser, projectId, serialTrack);
        return ResponseEntity.accepted().build();
    }


    @GetMapping(value ="/requestParticipants/{serial-track}")
    public ResponseEntity<ParticipantsResponse> getParticipants(
            @PathVariable("serial-track") String serialTrack
    ) {
        return ResponseEntity.ok(projectRequestService.getParticipants(serialTrack));
    }

    @GetMapping("/checkAcceptedProject")
    public ResponseEntity<Boolean> checkAcceptedProject(
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(projectRequestService.checkAcceptedProject(connectedUser));
    }

    @GetMapping(value = "/project-requests")
    public ResponseEntity<PageResponse<ProjectRequestResponse>> getAllProjectRequests(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(projectRequestService.getAllProjectRequests(page, size, connectedUser));
    }
}
