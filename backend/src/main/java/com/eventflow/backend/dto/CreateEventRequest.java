package com.eventflow.backend.dto;

import com.eventflow.backend.entity.EventState;
import lombok.Data;

@Data
public class CreateEventRequest {

    private Long hostId;      // Şimdilik host'u id ile vereceğiz
    private String title;
    private String description;
    private String code;
    private EventState state;

}

