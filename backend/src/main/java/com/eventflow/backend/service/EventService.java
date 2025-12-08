package com.eventflow.backend.service;

import com.eventflow.backend.dto.CreateEventRequest;
import com.eventflow.backend.dto.EventDto;
import com.eventflow.backend.entity.Event;
import com.eventflow.backend.entity.User;
import com.eventflow.backend.repository.EventRepository;
import com.eventflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
                .orElseThrow(() -> new RuntimeException("Event not found"));
        return toDto(event);
    }

    public EventDto createEvent(CreateEventRequest request) {
        User host = userRepository.findById(request.getHostId())
                .orElseThrow(() -> new RuntimeException("Host not found"));

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
                .orElseThrow(() -> new RuntimeException("Event not found"));

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setCode(request.getCode());
        event.setState(request.getState());
        event.setUpdatedAt(LocalDateTime.now());

        Event saved = eventRepository.save(event);
        return toDto(saved);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    private EventDto toDto(Event event) {
        return EventDto.builder()
                .id(event.getId())
                .hostId(event.getHost().getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .code(event.getCode())
                .state(event.getState())
                .build();
    }

}

