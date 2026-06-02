package com.org.PisofMind.services;

import com.org.PisofMind.dtos.BudgetResponse;
import com.org.PisofMind.dtos.SetBudgetRequest;

public interface BudgetServicePort {

    BudgetResponse setBudget(SetBudgetRequest request);

    BudgetResponse getBudgetStatus(Long userId);
}
