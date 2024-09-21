package com.soutLink.student.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record AppointmentRequest(
        Long id,
        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String objet,

        @NotNull(message = "102")
        @NotEmpty(message = "102")
        String description
) {
}