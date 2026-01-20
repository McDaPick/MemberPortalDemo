package com.example.nyl_demo.contoller;

import com.example.nyl_demo.model.Claim;
import com.example.nyl_demo.repository.ClaimRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.nyl_demo.service.AnthropicService;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "*", allowedHeaders = "*")
//@CrossOrigin(origins = "http://localhost:5173") // Local dev
public class ClaimController {

    // READ: Get all claims
    // 1. You must declare the variables here so the methods can "see" them
    private final ClaimRepository claimRepository;
    private final AnthropicService anthropicService;

    // 2. This constructor tells Spring to "Inject" the real objects when the app starts
    public ClaimController(ClaimRepository claimRepository, AnthropicService anthropicService) {
        this.claimRepository = claimRepository;
        this.anthropicService = anthropicService;
    }

    // READ: Get all claims (This is what React is looking for)
    @GetMapping
    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    // CREATE: Add a new claim
    @PostMapping
    public Claim createClaim(@RequestBody Claim claim) {
        System.out.println("im here!");
        try {
            String aiRawResponse = anthropicService.analyzeClaim(claim.getDescription());

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(aiRawResponse);
            String aiText = root.path("content").get(0).path("text").asText();

            // Parse the inner JSON Claude sent back
            JsonNode innerJson = mapper.readTree(aiText);
            claim.setAiSummary(innerJson.path("summary").asText());
            claim.setRiskLevel(innerJson.path("riskLevel").asText());

        } catch (Exception e) {
            e.printStackTrace();
            claim.setAiSummary("Review Required");
            claim.setRiskLevel("Low");
        }

        if (claim.getClaimNumber() == null) {
            claim.setClaimNumber("CLN-" + System.currentTimeMillis());
        }

        return claimRepository.save(claim);
    }

    // Helper method to pull the text out of Claude's JSON response
    private String extractContent(String jsonResponse) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(jsonResponse);

            // Claude 3 API structure: content[0].text
            String rawText = root.path("content").get(0).path("text").asText();

            // Since we asked Claude for JSON inside the text, we might need to parse it again
            // or just return the raw text if Claude didn't wrap it in quotes
            return rawText;
        } catch (Exception e) {
            System.err.println("Jackson Parsing Error: " + e.getMessage());
            return "Analysis Complete (Check Logs)";
        }
    }

    // UPDATE: Update status or amount
    @PutMapping("/{id}")
    public ResponseEntity<Claim> updateClaim(@PathVariable Long id, @RequestBody Claim claimDetails) {
        return claimRepository.findById(id).map(claim -> {
            claim.setDescription(claimDetails.getDescription());
            claim.setAmount(claimDetails.getAmount());
            claim.setStatus(claimDetails.getStatus());
            claim.setServiceDate(claimDetails.getServiceDate());
            return ResponseEntity.ok(claimRepository.save(claim));
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE: Remove a claim
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClaim(@PathVariable Long id) {
        return claimRepository.findById(id).map(claim -> {
            claimRepository.delete(claim);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}