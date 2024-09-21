package com.soutLink.user.Student;


import com.soutLink.student.project.ProjectRequestHistory;
import com.soutLink.supervisor.project.Project;
import com.soutLink.supervisor.project.ProjectAcceptable;
import com.soutLink.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("Student")
@Table(name = "_student")
public class Student extends User {

    @Column(nullable = false, unique = true)
    private Long apogeeCode;

    @Column(nullable = false)
    private String sector;

    @OneToOne(mappedBy = "student")
    private ProjectAcceptable projectAcceptable;

    @ManyToMany(mappedBy = "partners", cascade = CascadeType.ALL)
    private List<ProjectRequestHistory> projectHistories;

}
