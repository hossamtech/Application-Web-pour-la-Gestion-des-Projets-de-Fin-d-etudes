package com.soutLink.supervisor.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SupervisorResponse {
    private String fullName;
    private String email;
    private String department;
    private byte[] profileImg;
}
