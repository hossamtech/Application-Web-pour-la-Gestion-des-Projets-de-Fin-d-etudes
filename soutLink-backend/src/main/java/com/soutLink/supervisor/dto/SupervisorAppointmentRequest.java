package com.soutLink.supervisor.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record SupervisorAppointmentRequest(
        Long id,
        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String date,

        @NotNull(message = "102")
        @NotEmpty(message = "102")
        String time
) {

}
