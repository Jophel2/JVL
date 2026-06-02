package com.org.PisofMind.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * SecurityConfig - Spring Security Configuration.
 * 
 * Single Responsibility: Configures security-related beans and password encoding.
 * Provides:
 * - BCryptPasswordEncoder for secure password hashing
 * - SecurityFilterChain for API endpoint authorization
 * - CORS configuration for frontend access
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Password Encoder Bean - Uses BCrypt algorithm.
     * Strength 10 provides good balance between security and performance.
     * BCrypt automatically handles salt generation.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    /**
     * Security Filter Chain - Configures which endpoints require authentication.
     * 
     * Public endpoints (no auth required):
     * - /api/auth/register
     * - /api/auth/login
     * 
     * All other endpoints are accessible to any user (for now - should add JWT filter later).
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()
                .requestMatchers("/api/budget/**", "/api/expenses/**", "/api/summary/**").permitAll()
                .anyRequest().permitAll()
            );
        
        return http.build();
    }

    /**
     * CORS Configuration - Allow frontend to make requests from any origin.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
