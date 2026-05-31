package com.org.PisofMind.controllers;

import com.org.PisofMind.dtos.AuthResponse;
import com.org.PisofMind.dtos.LoginRequest;
import com.org.PisofMind.dtos.LoginResponse;
import com.org.PisofMind.dtos.RegisterRequest;
import com.org.PisofMind.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * AuthController - REST API Controller for Authentication.
 * 
 * Single Responsibility: Handles HTTP requests for user registration and login.
 * Routes:
 * - POST /api/auth/register - Register new user
 * - POST /api/auth/login - Login user
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    private final AuthService authService;

    /**
     * Register a new user.
     * 
     * @param request - RegisterRequest with email, password, gender, age
     * @return AuthResponse with success status
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.registerUser(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AuthResponse(e.getMessage(), false));
        }
    }

    /**
     * Login user and get JWT token.
     * 
     * @param request - LoginRequest with email and password
     * @return LoginResponse with JWT token and user ID
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = authService.loginUser(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse(null, null, e.getMessage()));
        }
    }
}
