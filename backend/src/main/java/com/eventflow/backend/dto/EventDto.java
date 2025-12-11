package com.eventflow.backend.dto;

import com.eventflow.backend.entity.EventState;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventDto {

    private Long id;
    private Long hostId;
    private String title;
    private String description;
    private String code;
    private EventState state;

}


