package com.soutLink.student.project;


import com.soutLink.common.BaseEntity;
import com.soutLink.enums.ProjectRequestStatus;
import com.soutLink.enums.ProjectStatus;
import com.soutLink.supervisor.project.Project;
import com.soutLink.user.Student.Student;
import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ProjectRequestHistory extends BaseEntity {

    @Positive
    private int numberStudents;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectRequestStatus status;

    @Column(unique = true, nullable = false)
    private String serialTrack;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private Student owner;

    @Lob
    @Column(columnDefinition = "longblob")
    private String description;

    @ManyToMany
    @JoinTable(
            name = "project_partners",
            joinColumns = @JoinColumn(name = "projectHistories_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private List<Student> partners = new ArrayList<>();

    private boolean complete;

}
