package com.heap.backend.repository;

import com.heap.backend.models.BusinessGrowthPlan;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BusinessGrowthPlanRepository extends MongoRepository<BusinessGrowthPlan, String> {
  Optional<BusinessGrowthPlan> findById(String id);
}
