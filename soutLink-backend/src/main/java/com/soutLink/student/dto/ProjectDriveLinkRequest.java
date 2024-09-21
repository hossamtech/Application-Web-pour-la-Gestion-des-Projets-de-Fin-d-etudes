package com.soutLink.student.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ProjectDriveLinkRequest(
        Long id,
        String message,
        String driveLink,
        @NotNull(message = "102")
        Long projectId
) {
}
