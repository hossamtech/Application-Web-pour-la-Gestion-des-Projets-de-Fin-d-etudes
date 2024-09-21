package com.soutLink.supervisor.project;

import com.soutLink.enums.SummaryStatus;
import com.soutLink.user.Supervisor.Supervisor;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "list_projects")
@EntityListeners(AuditingEntityListener.class)
public class ListProjects {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SummaryStatus status;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="supervisor_id")
    private Supervisor supervisor;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "listProject")
    private List<Project> listProject;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModified;

}
