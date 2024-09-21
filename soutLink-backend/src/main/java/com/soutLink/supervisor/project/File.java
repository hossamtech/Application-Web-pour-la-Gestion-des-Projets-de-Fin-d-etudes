package com.soutLink.supervisor.project;

import com.soutLink.common.BaseEntity;
import com.soutLink.enums.FileStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class File extends BaseEntity {
    private String fileName;
    private String fileType;
    private String filePath;
    private long size;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FileStatus status;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
}
