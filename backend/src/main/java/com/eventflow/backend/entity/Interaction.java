package com.eventflow.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
