package com.eventflow.backend.service;

import com.eventflow.backend.dto.CreateEventRequest;
import com.eventflow.backend.dto.EventDto;
import com.eventflow.backend.entity.Event;
import com.eventflow.backend.entity.User;
import com.eventflow.backend.exception.ResourceNotFoundException;
import com.eventflow.backend.repository.EventRepository;
import com.eventflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public List<EventDto> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    public EventDto getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        return toDto(event);
    }

    public EventDto createEvent(CreateEventRequest request) {
        // Login olan kullanıcının email'ini al
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // username = email

        // Host'u DB'den bul
        User host = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Host not found with email: " + email));

        Event event = Event.builder()
                .host(host)
                .title(request.getTitle())
                .description(request.getDescription())
                .code(request.getCode())
                .state(request.getState())
                .createdAt(LocalDateTime.now())
                .build();

        Event saved = eventRepository.save(event);
        return toDto(saved);
    }

    public EventDto updateEvent(Long id, CreateEventRequest request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setCode(request.getCode());
        event.setState(request.getState());

        Event updated = eventRepository.save(event);
        return toDto(updated);
    }

    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        eventRepository.delete(event);
    }

    private EventDto toDto(Event event) {
        EventDto dto = new EventDto();
        dto.setId(event.getId());
        dto.setHostId(event.getHost() != null ? event.getHost().getId() : null);
        dto.setTitle(event.getTitle());
        dto.setDescription(event.getDescription());
        dto.setCode(event.getCode());
        dto.setState(event.getState());
        return dto;
    }

}
