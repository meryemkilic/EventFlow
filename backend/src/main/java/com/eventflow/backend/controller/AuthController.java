package com.eventflow.backend.controller;

import com.eventflow.backend.dto.RegisterRequest;
import com.eventflow.backend.entity.Role;
import com.eventflow.backend.entity.User;
import com.eventflow.backend.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        // 1) Email zaten kullanılıyor mu?
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            // 409 Conflict döndürelim
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email is already in use");
        }
        // 2) Yeni User oluştur
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())) // Şifre encode!
                .role(Role.HOST) // Sisteme kayıt olan herkes şimdilik HOST
                .createdAt(LocalDateTime.now())
                .build();
        userRepository.save(user);
        // 201 Created
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("User registered successfully");
    }
}



