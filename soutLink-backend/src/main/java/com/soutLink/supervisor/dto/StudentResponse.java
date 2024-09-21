package com.soutLink.supervisor.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentResponse {
    private String fullName;
    private String email;
    private String sector;
    private Long apogee;
    private byte[] profileImage;
}
