package com.eventflow.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // CSRF dev için kapalı
                .csrf(csrf -> csrf.disable())
                // Tüm istekleri şimdilik serbest bırakıyoruz
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                );

        // Login form, basic auth vs. yok
        return http.build();
    }
}
