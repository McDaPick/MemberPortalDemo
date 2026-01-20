package com.example.nyl_demo.repository;

import com.example.nyl_demo.model.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
    // 1. Find claims by exact status (e.g., "Pending")
    List<Claim> findByStatus(String status);

    // 2. Find claims by status, ignored case (e.g., "pending" or "PENDING")
    List<Claim> findByStatusIgnoreCase(String status);

    // 3. Search for claims where description contains a keyword (e.g., "Pharmacy")
    List<Claim> findByDescriptionContainingIgnoreCase(String keyword);
}