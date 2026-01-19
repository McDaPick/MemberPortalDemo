package com.example.nyl_demo.contoller;

import com.example.nyl_demo.model.Claim;
import com.example.nyl_demo.repository.ClaimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "http://localhost:5173") // Crucial for React connection
public class ClaimController {

    @Autowired
    private ClaimRepository repository;

    @GetMapping
    public List<Claim> getAllClaims() {
        return repository.findAll();
    }
}