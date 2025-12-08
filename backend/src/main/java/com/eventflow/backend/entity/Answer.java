package com.eventflow.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "answers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Hangi interaction'a cevap verilmiş?
    @ManyToOne(optional = false)
    @JoinColumn(name = "interaction_id")
    private Interaction interaction;

    // Hangi participant session bu cevabı verdi?
    @ManyToOne(optional = false)
    @JoinColumn(name = "participant_session_id")
    private ParticipantSession participantSession;

    // Cevabın kendisi (JSON)
    @Column(columnDefinition = "TEXT")
    private String answerJson;

    @Column(nullable = false)
    private LocalDateTime createdAt;

}
