package com.eventflow.backend.repository;

import com.eventflow.backend.entity.Event;
import com.eventflow.backend.entity.Interaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InteractionRepository extends JpaRepository<Interaction, Long> {
    // Bir event'e ait tüm interaction'ları timeline sırasına göre getir
    List<Interaction> findByEventOrderByOrderIndexAsc(Event event);
}
