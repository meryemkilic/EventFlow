package com.eventflow.backend.service;

import com.eventflow.backend.dto.CreateInteractionRequest;
import com.eventflow.backend.dto.InteractionDto;
import com.eventflow.backend.entity.Event;
import com.eventflow.backend.entity.Interaction;
import com.eventflow.backend.exception.ResourceNotFoundException;
import com.eventflow.backend.repository.EventRepository;
import com.eventflow.backend.repository.InteractionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InteractionService {

    private final InteractionRepository interactionRepository;
    private final EventRepository eventRepository;

    public List<InteractionDto> getInteractionsForEvent(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        return interactionRepository.findByEventOrderByOrderIndexAsc(event)
                .stream()
                .map(this::toDto)
                .toList();
    }

    public InteractionDto createInteraction(Long eventId, CreateInteractionRequest request) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        Interaction interaction = Interaction.builder()
                .event(event)
                .type(request.getType())
                .state(request.getState())
                .contentJson(request.getContentJson())
                .behaviorJson(request.getBehaviorJson())
                .gamificationJson(request.getGamificationJson())
                .orderIndex(request.getOrderIndex())
                .build();

        Interaction saved = interactionRepository.save(interaction);
        return toDto(saved);
    }

    public InteractionDto updateInteraction(Long id, CreateInteractionRequest request) {
        Interaction interaction = interactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Interaction not found with id: " + id));

        interaction.setType(request.getType());
        interaction.setState(request.getState());
        interaction.setContentJson(request.getContentJson());
        interaction.setBehaviorJson(request.getBehaviorJson());
        interaction.setGamificationJson(request.getGamificationJson());
        interaction.setOrderIndex(request.getOrderIndex());

        Interaction updated = interactionRepository.save(interaction);
        return toDto(updated);
    }

    public void deleteInteraction(Long id) {
        Interaction interaction = interactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Interaction not found with id: " + id));
        interactionRepository.delete(interaction);
    }

    private InteractionDto toDto(Interaction interaction) {
        InteractionDto dto = new InteractionDto();
        dto.setId(interaction.getId());
        dto.setEventId(interaction.getEvent() != null ? interaction.getEvent().getId() : null);
        dto.setType(interaction.getType());
        dto.setState(interaction.getState());
        dto.setContentJson(interaction.getContentJson());
        dto.setBehaviorJson(interaction.getBehaviorJson());
        dto.setGamificationJson(interaction.getGamificationJson());
        dto.setOrderIndex(interaction.getOrderIndex());
        return dto;
    }

}
