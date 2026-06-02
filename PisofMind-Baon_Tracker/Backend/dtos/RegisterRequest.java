package com.org.PisofMind.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * RegisterRequest DTO - Used for user registration API endpoint.
 * 
 * Single Responsibility: Transfers registration data from client to server.
 * Includes validation annotations at service layer (not here, following REST best practices).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String email;
    private String password;
    private String gender;
    private int age;
}
