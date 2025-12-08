package com.eventflow.backend.dto;

import lombok.Data;

@Data
public class CreateAnswerRequest {
    private Long participantSessionId;
    private String answerJson;
}
