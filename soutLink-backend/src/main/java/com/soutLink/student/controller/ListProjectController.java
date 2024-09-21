package com.soutLink.student.controller;

import com.soutLink.common.PageResponse;
import com.soutLink.enums.ProjectStatus;
import com.soutLink.student.dto.DetailedListResponse;
import com.soutLink.student.services.ListProjectService;
import com.soutLink.supervisor.dto.DetailedProjectResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("etudiant")
@RequiredArgsConstructor
@Tag(name = "List-Project")
public class ListProjectController {

    private final ListProjectService listProjectService;

    @GetMapping("/all-listProjects")
    public ResponseEntity<List<DetailedListResponse>> findAllListsWithStatusPlaced(
    ) {
        return ResponseEntity.ok(listProjectService.findAllListsWithStatusPlaced());
    }

    @GetMapping("/all-projects/{listProject-id}")
    public ResponseEntity<PageResponse<DetailedProjectResponse>> findListProjectByListId(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            @RequestParam(name = "status", required = false) ProjectStatus status,
            @PathVariable("listProject-id") Long listProjectId
    ) {
        return ResponseEntity.ok(listProjectService.findListProjectByListId(page, size, status, listProjectId));
    }

    @GetMapping(value = "/overview-project/{project-id}")
    public ResponseEntity<DetailedProjectResponse> overviewProjectFromStudentById(
            @PathVariable("project-id") Long projectId
    ) {
        return ResponseEntity.ok(listProjectService.overviewProjectFromStudentById(projectId));
    }
}