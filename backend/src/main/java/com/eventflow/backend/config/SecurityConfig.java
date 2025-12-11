package com.eventflow.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // Dev ortamı için CSRF disable. 
                // İleride form login + Thymeleaf için istersen açarız.
                .csrf(AbstractHttpConfigurer::disable)

                // KİM NEREYE ERİŞEBİLİR?
                .authorizeHttpRequests(auth -> auth
                        // 🔓 Herkese açık endpoint'ler
                        .requestMatchers(
                                "/api/health",
                                "/api/auth/register",
                                "/api/join/**"
                        ).permitAll()

                        // 🔓 Participant READ: Soruları görebilmesi için
                        .requestMatchers(HttpMethod.GET, "/api/events/*/interactions").permitAll()

                        // 🔓 Participant ANSWER: Cevap gönderebilmesi için (daha spesifik, önce kontrol edilmeli)
                        .requestMatchers(HttpMethod.POST, "/api/interactions/*/answers").permitAll()

                        // 🔐 Host-only alanlar:
                        // Event ve Interaction yönetimi sadece HOST rolüne açık
                        .requestMatchers("/api/events/**").hasRole("HOST")
                        // Interaction yönetimi (answers hariç - yukarıda permitAll ile açıldı)
                        .requestMatchers("/api/interactions/**").hasRole("HOST")

                        // Geri kalan her şeyde auth zorunlu
                        .anyRequest().authenticated()
                )

                // HTTP Basic Auth (Postman + ileride React'te Authorization header ile)
                .httpBasic(Customizer.withDefaults())

                // Bizim CustomUserDetailsService + PasswordEncoder
                .userDetailsService(userDetailsService)

                // Slaytlara uygun şekilde stateful session (JSESSIONID) kullanıyoruz
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                );

        return http.build();
    }
}
