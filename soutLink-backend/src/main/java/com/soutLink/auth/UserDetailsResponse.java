package com.soutLink.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserDetailsResponse {
    private String firstName;
    private String lastName;
    private String fullName;
    private String email;
    private byte[] profileImg;
}