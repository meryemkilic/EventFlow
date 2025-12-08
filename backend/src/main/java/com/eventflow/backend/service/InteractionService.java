package com.eventflow.backend.service;

import com.eventflow.backend.dto.CreateInteractionRequest;
import com.eventflow.backend.dto.InteractionDto;
import com.eventflow.backend.entity.Event;
import com.eventflow.backend.entity.Interaction;
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
                .orElseThrow(() -> new RuntimeException("Event not found"));

        return interactionRepository.findByEventOrderByOrderIndexAsc(event)
                .stream()
                .map(this::toDto)
                .toList();
    }

    public InteractionDto createInteraction(Long eventId, CreateInteractionRequest request) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

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
                .orElseThrow(() -> new RuntimeException("Interaction not found"));

        interaction.setType(request.getType());
        interaction.setState(request.getState());
        interaction.setContentJson(request.getContentJson());
        interaction.setBehaviorJson(request.getBehaviorJson());
        interaction.setGamificationJson(request.getGamificationJson());
        interaction.setOrderIndex(request.getOrderIndex());

        Interaction saved = interactionRepository.save(interaction);
        return toDto(saved);
    }

    public void deleteInteraction(Long id) {
        interactionRepository.deleteById(id);
    }

    private InteractionDto toDto(Interaction interaction) {
        return InteractionDto.builder()
                .id(interaction.getId())
                .eventId(interaction.getEvent().getId())
                .type(interaction.getType())
                .state(interaction.getState())
                .contentJson(interaction.getContentJson())
                .behaviorJson(interaction.getBehaviorJson())
                .gamificationJson(interaction.getGamificationJson())
                .orderIndex(interaction.getOrderIndex())
                .build();
    }

}
