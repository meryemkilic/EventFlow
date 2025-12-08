package com.eventflow.backend.controller;

import com.eventflow.backend.dto.CreateAnswerRequest;
import com.eventflow.backend.service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/interactions")
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService answerService;

    @PostMapping("/{interactionId}/answers")
    @ResponseStatus(HttpStatus.CREATED)
    public void createAnswer(@PathVariable Long interactionId,
                             @RequestBody CreateAnswerRequest request) {
        answerService.createAnswer(interactionId, request);
    }

}
