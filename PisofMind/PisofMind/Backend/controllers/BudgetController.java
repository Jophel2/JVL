package com.org.PisofMind.controllers;

import com.org.PisofMind.dtos.BudgetResponse;
import com.org.PisofMind.dtos.SetBudgetRequest;
import com.org.PisofMind.services.BudgetServicePort;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * BudgetController - REST API Controller for Budget Management.
 * 
 * Single Responsibility: Handles HTTP requests for budget operations.
 * Routes:
 * - POST /api/budget/set - Set user budget
 * - GET /api/budget/{userId} - Get budget status
 */
@RestController
@RequestMapping("/api/budget")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class BudgetController {

    private final BudgetServicePort budgetService;

    /**
     * Set budget for a user.
     * 
     * @param request - SetBudgetRequest with userId and budget amount
     * @return BudgetResponse with updated budget information
     */
    @PostMapping("/set")
    public ResponseEntity<BudgetResponse> setBudget(@RequestBody SetBudgetRequest request) {
        try {
            BudgetResponse response = budgetService.setBudget(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    /**
     * Get current budget status for a user.
     * 
     * @param userId - User ID
     * @return BudgetResponse with current budget information
     */
    @GetMapping("/{userId}")
    public ResponseEntity<BudgetResponse> getBudgetStatus(@PathVariable Long userId) {
        try {
            BudgetResponse response = budgetService.getBudgetStatus(userId);
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}
