package com.eventflow.backend.controller;

import com.eventflow.backend.dto.JoinRequest;
import com.eventflow.backend.dto.JoinResponse;
import com.eventflow.backend.service.ParticipantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ParticipantController {

    private final ParticipantService participantService;

    @PostMapping("/join")
    public ResponseEntity<JoinResponse> joinEvent(@RequestBody JoinRequest request) {
        JoinResponse response = participantService.joinEvent(request);
        return ResponseEntity.ok(response);
    }
}



