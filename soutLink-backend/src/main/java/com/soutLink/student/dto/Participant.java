package com.soutLink.student.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Participant {
    private String fullName;
    private byte[] profileImage;
}
