package com.eventflow.backend.dto;

import com.eventflow.backend.entity.EventState;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EventDto {

    private Long id;
    private Long hostId;
    private String title;
    private String description;
    private String code;
    private EventState state;

}

