package com.soutLink.student.mapper;

import com.soutLink.file.FileUtils;
import com.soutLink.student.dto.ProjectRequestResponse;
import com.soutLink.student.dto.SupervisorProjectResponse;
import com.soutLink.student.project.ProjectRequestHistory;
import com.soutLink.supervisor.dto.StudentResponse;
import com.soutLink.user.Supervisor.Supervisor;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ProjectRequestMapper {

    public ProjectRequestResponse toStudentRequestsResponse(ProjectRequestHistory request) {
        return ProjectRequestResponse.builder()
                .id(request.getId())
                .projectTitle(request.getProject().getTitle())
                .status(request.getStatus())
                .numberStudents(request.getProject().getNumberStudents())
                .supervisor(ToSupervisorResponse(request.getProject().getSupervisor()))
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
                .date(request.getCreatedDate().format(DateTimeFormatter.ofPattern("d, MMMM yyyy")))
                .build();
    }

    private SupervisorProjectResponse ToSupervisorResponse(Supervisor supervisor) {
        return SupervisorProjectResponse.builder()
                .fullName(supervisor.getFullName())
                .email(supervisor.getUsername())
                .profileImg(FileUtils.readFileFromLocation(supervisor.getProfileImg()))
                .department(supervisor.getDepartment())
                .build();
    }
}
