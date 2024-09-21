package com.soutLink.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.management.relation.Role;

@Getter
@Setter
@Builder
public class AuthenticationResponse {
    private String token;
}