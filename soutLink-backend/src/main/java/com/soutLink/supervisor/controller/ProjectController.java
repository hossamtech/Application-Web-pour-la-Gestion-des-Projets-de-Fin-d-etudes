package com.soutLink.supervisor.controller;

import com.soutLink.common.PageResponse;
import com.soutLink.enums.ProjectStatus;
import com.soutLink.supervisor.dto.DetailedProjectResponse;
import com.soutLink.supervisor.dto.ProjectRequest;
import com.soutLink.supervisor.dto.ProjectResponse;
import com.soutLink.supervisor.dto.SummaryResponse;
import com.soutLink.supervisor.services.ProjectService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import kong.unirest.FileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("project")
@RequiredArgsConstructor
@Tag(name = "Project")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<Long> saveProject(
            @Valid @RequestBody ProjectRequest request,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(projectService.save(request, connectedUser));
    }

    @GetMapping("{project-id}")
    public ResponseEntity<ProjectResponse> findBookById(
            @PathVariable("project-id") Long projectId
    ) {
        return ResponseEntity.ok(projectService.findById(projectId));
    }

    @GetMapping("/summary")
    public ResponseEntity<SummaryResponse> getSummaryByUserId(
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(projectService.getSummaryByUserId(connectedUser));
    }

    @PostMapping(value = "/file/{project-id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadFilesProject(
            @PathVariable("project-id") Long projectId,
            @RequestPart("files") List<MultipartFile> files,
            Authentication connectedUser
    ) {
        projectService.uploadFilesProject(files, connectedUser, projectId);
        return ResponseEntity.accepted().build();
    }

    @PostMapping(value = "/file/delete")
    public ResponseEntity<?> deleteFileById(
            @RequestBody() List<Long> fileId
    ) {
        projectService.deleteFileById(fileId);
        return ResponseEntity.accepted().build();
    }

    @PatchMapping("/list-project/place")
    public ResponseEntity<?> placeListProjects (
            Authentication connectedUser
    ) {
        projectService.placeListProjects(connectedUser);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/all-projects")
    public ResponseEntity<PageResponse<DetailedProjectResponse>> findProjectBySupervisor(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            @RequestParam(name = "status", required = false) ProjectStatus status,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(projectService.findAllProjectBySupervisor(page, size, status, connectedUser));
    }

    @GetMapping(value = "/overview-project/{project-id}")
    public ResponseEntity<DetailedProjectResponse> overviewProjectById(
            @PathVariable("project-id") Long projectId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(projectService.overviewProjectById(projectId, connectedUser));
    }

}
