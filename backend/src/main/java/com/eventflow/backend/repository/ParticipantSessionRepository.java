package com.eventflow.backend.repository;

import com.eventflow.backend.entity.Event;
import com.eventflow.backend.entity.ParticipantSession;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ParticipantSessionRepository extends JpaRepository<ParticipantSession, Long> {
    List<ParticipantSession> findByEvent(Event event);
}
