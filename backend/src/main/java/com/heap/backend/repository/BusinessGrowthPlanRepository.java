package com.heap.backend.repository;

import com.heap.backend.models.BusinessGrowthPlan;
import com.heap.backend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BusinessGrowthPlanRepository extends MongoRepository<BusinessGrowthPlan, String> {
  Optional<BusinessGrowthPlan> findByEmail(String email);
}
