package com.eventflow.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "participant_sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParticipantSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Hangi event'e katılmış?
    @ManyToOne(optional = false)
    @JoinColumn(name = "event_id")
    private Event event;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private Boolean guest; // true = guest, false = registered

    @Column(nullable = false)
    private Integer xp;

    @Column(nullable = false)
    private LocalDateTime createdAt;

}
