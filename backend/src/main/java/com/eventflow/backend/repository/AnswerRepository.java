package com.eventflow.backend.repository;

import com.eventflow.backend.entity.Answer;
import com.eventflow.backend.entity.Interaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findByInteraction(Interaction interaction);
}
