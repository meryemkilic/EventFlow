package com.eventflow.backend.dto;

import com.eventflow.backend.entity.InteractionState;
import com.eventflow.backend.entity.InteractionType;
import lombok.Data;

@Data
public class CreateInteractionRequest {
    private InteractionType type;
    private InteractionState state;
    private String contentJson;
    private String behaviorJson;
    private String gamificationJson;
    private Integer orderIndex;
}
