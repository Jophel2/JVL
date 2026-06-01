package com.org.PisofMind.dtos;

import com.org.PisofMind.enums.BudgetPeriod;
import com.org.PisofMind.enums.ExpenseCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * CategoryBudgetResponse DTO - Returns budget values for a specific category.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryBudgetResponse {
    private ExpenseCategory category;
    private BigDecimal budget;
    private BigDecimal spent;
    private BigDecimal remaining;
    private BudgetPeriod period;
}
