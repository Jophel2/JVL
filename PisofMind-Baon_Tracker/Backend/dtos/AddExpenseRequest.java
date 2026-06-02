package com.org.PisofMind.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * AddExpenseRequest DTO - Used for creating a new expense.
 * 
 * Single Responsibility: Transfers expense data from client to server.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddExpenseRequest {
    private Long userId;
    private BigDecimal amount;
    private String category;  // String - will be converted to enum in service
    private String description;
}
