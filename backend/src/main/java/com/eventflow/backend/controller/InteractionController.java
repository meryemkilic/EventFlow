package com.eventflow.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.eventflow.backend.dto.CreateInteractionRequest;
import com.eventflow.backend.dto.InteractionDto;
import com.eventflow.backend.service.InteractionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class InteractionController {

    private final InteractionService interactionService;

    // Belirli bir event'e ait tüm interaction'lar
    @GetMapping("/events/{eventId}/interactions")
    public List<InteractionDto> getInteractions(@PathVariable Long eventId) {
        return interactionService.getInteractionsForEvent(eventId);
    }

    // Belirli bir event'e yeni interaction ekle
    @PostMapping("/events/{eventId}/interactions")
    public ResponseEntity<InteractionDto> createInteraction(@PathVariable Long eventId,
                                                            @RequestBody CreateInteractionRequest request) {
        InteractionDto dto = interactionService.createInteraction(eventId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    // Interaction güncelle
    @PutMapping("/interactions/{id}")
    public InteractionDto updateInteraction(@PathVariable Long id,
                                            @RequestBody CreateInteractionRequest request) {
        return interactionService.updateInteraction(id, request);
    }

    // Interaction sil
    @DeleteMapping("/interactions/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteInteraction(@PathVariable Long id) {
        interactionService.deleteInteraction(id);
    }

}
