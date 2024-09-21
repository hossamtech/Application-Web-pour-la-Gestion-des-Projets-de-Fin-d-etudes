package com.soutLink.supervisor.mapper;

import com.soutLink.auth.UserDetailsResponse;
import com.soutLink.enums.ProjectStatus;
import com.soutLink.file.FileUtils;
import com.soutLink.supervisor.dto.*;
import com.soutLink.supervisor.project.File;
import com.soutLink.supervisor.project.Project;
import com.soutLink.supervisor.project.ProjectAcceptable;
import com.soutLink.supervisor.project.ProjectAcceptableRepository;
import com.soutLink.user.Student.Student;
import com.soutLink.user.Supervisor.Supervisor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectMapper {

    private final ProjectAcceptableRepository projectAcceptableRepository;

    public Project toProject(ProjectRequest request) {
        return Project.builder()
                .id(request.id())
                .title(request.title())
                .numberStudents(request.numberStudents())
                .description(request.description())
                .status(ProjectStatus.NOT_TAKEN)
                .build();
    }

    public ProjectResponse toProjectResponse(Project project) {
        return ProjectResponse.builder()
                .id(project.getId())
                .title(project.getTitle())
                .numberStudents(project.getNumberStudents())
                .description(project.getDescription())
                .files(mapFilesToFileResponse(project.getFiles()))
                .build();
    }

    public DetailedProjectResponse toDetailedProjectResponse(Project project) {
        List<Student> students = projectAcceptableRepository.findByProject(project).stream()
                .map(ProjectAcceptable::getStudent)
                .collect(Collectors.toList());

        return DetailedProjectResponse.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .numberStudents(project.getNumberStudents())
                .status(project.getStatus())
                .supervisor(mapSupervisorToSupervisorResponse(project.getSupervisor()))
                .students(mapStudentsToUserDetailsResponse(students))
                .files(mapFilesToFileResponse(project.getFiles()))
                .createdDate(project.getCreatedDate().format(DateTimeFormatter.ofPattern("d, MMMM yyyy")))
                .build();
    }

    private SupervisorResponse mapSupervisorToSupervisorResponse(Supervisor supervisor) {
        return SupervisorResponse.builder()
                .fullName(supervisor.getFullName())
                .email(supervisor.getUsername())
                .department(supervisor.getDepartment())
                .profileImg(FileUtils.readFileFromLocation(supervisor.getProfileImg()))
                .build();
    }

    public List<UserDetailsResponse> mapStudentsToUserDetailsResponse(List<Student> students) {
        return students.stream().map(student -> UserDetailsResponse.builder()
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .fullName(student.getFullName())
                .email(student.getEmail())
                .profileImg(FileUtils.readFileFromLocation(student.getProfileImg()))
                .build()).collect(Collectors.toList());
    }

    public List<FileResponse> mapFilesToFileResponse(List<File> files) {
        return files.stream().map(this::toFileResponse).collect(Collectors.toList());
    }

    private FileResponse toFileResponse(File file) {
        return FileResponse.builder()
                .id(file.getId())
                .fileName(file.getFileName())
                .fileType(file.getFileType())
                .size(file.getSize())
                .file(FileUtils.readFileFromLocation(file.getFilePath()))
                .build();
    }

}
