package com.soutLink.student.project;

import com.soutLink.common.BaseEntity;
import com.soutLink.supervisor.project.Project;
import com.soutLink.user.Student.Student;
import com.soutLink.user.User;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import jakarta.persistence.*;


@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ProjectDriveLink extends BaseEntity {


    @Lob
    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(name = "drive_link")
    private String driveLink;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
}
