package com.org.PisofMind.dtos;

import com.org.PisofMind.enums.ExpenseCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * SetBudgetRequest DTO - Used for setting a budget per expense category.
 *
 * Single Responsibility: Transfers category budget data from client to server.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SetBudgetRequest {
    private Long userId;
    private ExpenseCategory category;
    private BigDecimal budget;
}
