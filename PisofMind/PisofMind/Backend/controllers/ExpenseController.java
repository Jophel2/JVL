package com.org.PisofMind.controllers;

import com.org.PisofMind.dtos.AddExpenseRequest;
import com.org.PisofMind.dtos.ExpenseResponse;
import com.org.PisofMind.entities.User;
import com.org.PisofMind.services.AuthService;
import com.org.PisofMind.services.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * ExpenseController - REST API Controller for Expense Management.
 * 
 * Single Responsibility: Handles HTTP requests for expense operations.
 * Routes:
 * - POST /api/expenses - Add new expense
 * - GET /api/expenses/{userId} - Get all user expenses
 * - DELETE /api/expenses/{expenseId} - Delete an expense
 */
@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class ExpenseController {

    private final ExpenseService expenseService;
    private final AuthService authService;

    /**
     * Add a new expense for authenticated user.
     * Validates JWT token from header.
     * 
     * @param request - AddExpenseRequest with amount, category, description
     * @param token - JWT token from Authorization header
     * @return ExpenseResponse with saved expense details
     */
    @PostMapping
    public ResponseEntity<ExpenseResponse> addExpense(
            @RequestBody AddExpenseRequest request,
            @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            // Validate token
            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            
            Optional<User> user = authService.getUserFromToken(token);
            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(null);
            }

            request.setUserId(user.get().getId());
            ExpenseResponse response = expenseService.addExpense(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    /**
     * Get all expenses for a user.
     * 
     * @param userId - User ID
     * @return List of ExpenseResponse objects
     */
    @GetMapping("/{userId}")
    public ResponseEntity<List<ExpenseResponse>> getUserExpenses(@PathVariable Long userId) {
        try {
            List<ExpenseResponse> expenses = expenseService.getUserExpenses(userId);
            return ResponseEntity.ok(expenses);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    /**
     * Delete an expense (verification in backend to ensure user owns expense).
     * 
     * @param expenseId - Expense ID to delete
     * @return Success or error response
     */
    @DeleteMapping("/{expenseId}")
    public ResponseEntity<String> deleteExpense(@PathVariable Long expenseId) {
        try {
            expenseService.deleteExpense(expenseId);
            return ResponseEntity.ok("Expense deleted successfully");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Expense not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting expense");
        }
    }
}
