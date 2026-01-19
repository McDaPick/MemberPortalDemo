package com.example.nyl_demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "CLAIMS") // Maps this class to the Oracle table
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "CLAIM_NUMBER", nullable = false)
    private String claimNumber;

    @Column(name = "SERVICE_DATE", nullable = false)
    private LocalDate serviceDate;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "AMOUNT")
    private Double amount;

    @Column(name = "STATUS")
    private String status;

    // --- Constructors ---

    // JPA requires a protected or public no-arg constructor
    public Claim() {}

    public Claim(String claimNumber, LocalDate serviceDate, String description, Double amount, String status) {
        this.claimNumber = claimNumber;
        this.serviceDate = serviceDate;
        this.description = description;
        this.amount = amount;
        this.status = status;
    }

    // --- Getters and Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getClaimNumber() { return claimNumber; }
    public void setClaimNumber(String claimNumber) { this.claimNumber = claimNumber; }

    public LocalDate getServiceDate() { return serviceDate; }
    public void setServiceDate(LocalDate serviceDate) { this.serviceDate = serviceDate; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}