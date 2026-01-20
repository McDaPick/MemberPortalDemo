package com.example.nyl_demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.List;
import java.util.Map;

@Service
public class AnthropicService {

    private final WebClient webClient;

    @Value("${anthropic.api.key}")
    private String apiKey;

    public AnthropicService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("https://api.anthropic.com/v1/messages")
                .defaultHeader("x-api-key", "${anthropic.api.key}") // Key injected via properties
                .defaultHeader("anthropic-version", "2023-06-01")
                .defaultHeader("content-type", "application/json")
                .build();
    }

    public String analyzeClaim(String description) {
        // We use a "System Prompt" to ensure Claude doesn't talk too much
        String systemPrompt = "You are an insurance adjuster. Analyze claims and return ONLY a JSON object with: 'summary' (max 10 words) and 'riskLevel' (High, Medium, or Low).";

        Map<String, Object> body = Map.of(
                "model", "claude-3-haiku-20240307", // Haiku is the fastest/cheapest
                "max_tokens", 150,
                "system", systemPrompt,
                "messages", List.of(Map.of("role", "user", "content", description))
        );

        return this.webClient.post()
                .header("x-api-key", apiKey) // Pass the actual key
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block(); // .block() is fine for a demo/low volume
    }
}