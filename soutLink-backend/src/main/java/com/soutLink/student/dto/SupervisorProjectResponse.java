package com.soutLink.student.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SupervisorProjectResponse {
    private String fullName;
    private String email;
    private String department;
    private byte[] profileImg;

}
