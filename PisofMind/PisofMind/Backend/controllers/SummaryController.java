package com.org.PisofMind.controllers;

import com.org.PisofMind.services.SummaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * SummaryController - REST API Controller for Financial Summary.
 * 
 * Single Responsibility: Handles HTTP requests for financial summary and analytics.
 * Routes:
 * - GET /api/summary/{userId} - Get comprehensive financial summary
 */
@RestController
@RequestMapping("/api/summary")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class SummaryController {

    private final SummaryService summaryService;

    /**
     * Get comprehensive financial summary for a user.
     * Includes total spent, remaining budget, top category, category breakdown, and rank.
     * 
     * @param userId - User ID
     * @return Map with summary data
     */
    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getUserSummary(@PathVariable Long userId) {
        try {
            Map<String, Object> summary = summaryService.getUserSummary(userId);
            return ResponseEntity.ok(summary);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}
