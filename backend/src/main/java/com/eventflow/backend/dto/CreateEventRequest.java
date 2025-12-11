package com.eventflow.backend.dto;

import com.eventflow.backend.entity.EventState;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateEventRequest {

    @NotBlank
    @Size(max = 255)
    private String title;

    @Size(max = 1000)
    private String description;

    @NotBlank
    @Size(max = 20)
    private String code;

    @NotNull
    private EventState state;

}


