package com.eventflow.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "interactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Interaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Bu interaction hangi evente ait?
    @ManyToOne(optional = false)
    @JoinColumn(name = "event_id")
    private Event event;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InteractionType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InteractionState state;

    // Soru metni, seçenekler, vs. JSON olarak tutulacak
    @Column(columnDefinition = "TEXT")
    private String contentJson;

    // Timer, anonimlik, sonuç görünürlüğü, vs.
    @Column(columnDefinition = "TEXT")
    private String behaviorJson;

    // XP, puanlama, takım etkisi, vs.
    @Column(columnDefinition = "TEXT")
    private String gamificationJson;

    // Timeline sırası
    @Column(nullable = false)
    private Integer orderIndex;

}
