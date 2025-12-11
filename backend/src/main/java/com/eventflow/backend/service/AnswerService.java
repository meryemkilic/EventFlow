package com.eventflow.backend.service;

import com.eventflow.backend.dto.CreateAnswerRequest;
import com.eventflow.backend.entity.Answer;
import com.eventflow.backend.entity.Interaction;
import com.eventflow.backend.entity.ParticipantSession;
import com.eventflow.backend.exception.ResourceNotFoundException;
import com.eventflow.backend.repository.AnswerRepository;
import com.eventflow.backend.repository.InteractionRepository;
import com.eventflow.backend.repository.ParticipantSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final InteractionRepository interactionRepository;
    private final ParticipantSessionRepository participantSessionRepository;

    public void createAnswer(Long interactionId, CreateAnswerRequest request) {
        Interaction interaction = interactionRepository.findById(interactionId)
                .orElseThrow(() -> new ResourceNotFoundException("Interaction not found with id: " + interactionId));

        ParticipantSession participantSession = participantSessionRepository.findById(request.getParticipantSessionId())
                .orElseThrow(() -> new ResourceNotFoundException("ParticipantSession not found with id: " + request.getParticipantSessionId()));

        Answer answer = Answer.builder()
                .interaction(interaction)
                .participantSession(participantSession)
                .answerJson(request.getAnswerJson())
                .createdAt(LocalDateTime.now())
                .build();

        answerRepository.save(answer);
    }

}
