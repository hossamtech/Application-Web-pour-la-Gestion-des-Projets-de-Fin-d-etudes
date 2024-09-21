package com.soutLink.supervisor.project;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.soutLink.common.BaseEntity;
import com.soutLink.enums.ProjectStatus;
import com.soutLink.student.project.ProjectDriveLink;
import com.soutLink.user.Supervisor.Supervisor;
import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Project extends BaseEntity {

    private String title;

    @Positive
    private int numberStudents;

    @Lob
    @Column(columnDefinition = "longblob")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectStatus status;

    @ManyToOne
    @JoinColumn(name = "supervisor_id")
    private Supervisor supervisor;

    @OneToMany(mappedBy = "project")
    private List<ProjectAcceptable> projectAcceptable;

    @OneToMany(mappedBy = "project")
    private List<File> files;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "list_id")
    @JsonIgnore
    private ListProjects listProject;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectDriveLink> projectMessages;


}
