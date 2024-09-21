//package com.soutLink.student.project;
//
//import com.soutLink.enums.SummaryStatus;
//import com.soutLink.supervisor.project.ListProjects;
//import com.soutLink.supervisor.project.Project;
//import com.soutLink.user.Supervisor.Supervisor;
//import jakarta.persistence.*;
//import lombok.*;
//import org.springframework.data.annotation.CreatedDate;
//import org.springframework.data.annotation.LastModifiedDate;
//import org.springframework.data.jpa.domain.support.AuditingEntityListener;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//@Entity
//@Builder
//@Table(name = "post_projects")
//@EntityListeners(AuditingEntityListener.class)
//public class PostProject {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @OneToOne(cascade = CascadeType.MERGE)
//    @JoinColumn(name="list_id")
//    private ListProjects list;
//
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "listProject")
//    private List<Project> listProject;
//
//    @CreatedDate
//    @Column(nullable = false, updatable = false)
//    private LocalDateTime createdDate;
//
//    @LastModifiedDate
//    @Column(insertable = false)
//    private LocalDateTime lastModified;
//}
