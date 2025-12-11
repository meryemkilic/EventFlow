package com.eventflow.backend.repository;

import com.eventflow.backend.entity.Event;
import com.eventflow.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByHost(User host);

    Optional<Event> findByCode(String code);

}




