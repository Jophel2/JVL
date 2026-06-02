package com.org.PisofMind.dtos;

import com.org.PisofMind.enums.ExpenseCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * ExpenseResponse DTO - Response with expense details.
 * 
 * Single Responsibility: Transfers expense data to client.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseResponse {
    private Long id;
    private BigDecimal amount;
    private ExpenseCategory category;
    private String description;
    private LocalDateTime createdAt;
}
