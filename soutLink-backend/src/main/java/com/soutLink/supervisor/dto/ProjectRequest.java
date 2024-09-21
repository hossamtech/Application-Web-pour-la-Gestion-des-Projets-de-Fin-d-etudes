package com.soutLink.supervisor.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ProjectRequest(
        Long id,
        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String title,

        @Positive(message = "101")
        int numberStudents,

        @NotNull(message = "102")
        @NotEmpty(message = "102")
        String description
) {
}
