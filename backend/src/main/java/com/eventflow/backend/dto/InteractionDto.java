package com.eventflow.backend.dto;

import com.eventflow.backend.entity.InteractionState;
import com.eventflow.backend.entity.InteractionType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InteractionDto {
    private Long id;
    private Long eventId;
    private InteractionType type;
    private InteractionState state;
    private String contentJson;
    private String behaviorJson;
    private String gamificationJson;
    private Integer orderIndex;
}
