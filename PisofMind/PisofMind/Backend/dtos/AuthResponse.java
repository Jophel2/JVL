package com.org.PisofMind.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * AuthResponse DTO - Generic response for auth operations (register, etc).
 * 
 * Single Responsibility: Transfers auth operation results to client.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String message;
    private boolean success;
}
