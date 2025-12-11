package com.eventflow.backend.service;

import com.eventflow.backend.dto.JoinRequest;
import com.eventflow.backend.dto.JoinResponse;
import com.eventflow.backend.entity.Event;
import com.eventflow.backend.entity.ParticipantSession;
import com.eventflow.backend.exception.ResourceNotFoundException;
import com.eventflow.backend.repository.EventRepository;
import com.eventflow.backend.repository.ParticipantSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final EventRepository eventRepository;
    private final ParticipantSessionRepository participantSessionRepository;

    public JoinResponse joinEvent(JoinRequest request) {
        // Event'i kod ile bul
        Event event = eventRepository.findByCode(request.getCode())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with code: " + request.getCode()));

        // Yeni session oluştur
        ParticipantSession session = ParticipantSession.builder()
                .event(event)
                .nickname(request.getNickname())
                .guest(true) // Şimdilik herkes guest
                .xp(0)
                .createdAt(LocalDateTime.now())
                .build();

        ParticipantSession savedSession = participantSessionRepository.save(session);

        // Yanıt DTO'su
        return JoinResponse.builder()
                .sessionId(savedSession.getId())
                .eventId(event.getId())
                .eventTitle(event.getTitle())
                .build();
    }

}
