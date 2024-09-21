package com.soutLink.student.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ParticipantsResponse {
    private Participant owner;
    private List<Participant> partners;
}
