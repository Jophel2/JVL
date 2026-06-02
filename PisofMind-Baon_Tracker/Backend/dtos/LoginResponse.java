package com.org.PisofMind.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * LoginResponse DTO - Response returned from login API endpoint.
 * 
 * Single Responsibility: Transfers login success data to client (token and user ID).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private Long userId;
    private String message;
}
