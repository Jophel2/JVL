package com.org.PisofMind.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

/**
 * BudgetResponse DTO - Response with current budget status.
 *
 * Single Responsibility: Transfers budget summary data to client.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetResponse {
    private Long userId;
    private BigDecimal totalBudget;
    private BigDecimal totalSpent;
    private BigDecimal totalRemaining;
    private List<CategoryBudgetResponse> categoryBudgets;
}
