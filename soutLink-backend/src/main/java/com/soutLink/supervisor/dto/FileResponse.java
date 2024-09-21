package com.soutLink.supervisor.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FileResponse {
    private Long id;
    private String fileName;
    private String fileType;
    private byte[] file;
    private long size;

    public static class AppointmentDetailsResponse {
    }
}
