package com.heap.backend.repository;

import com.heap.backend.models.BusinessGrowthPlan;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface BusinessGrowthPlanRepository extends MongoRepository<BusinessGrowthPlan, String> {

  Optional<BusinessGrowthPlan> findByUserIdAndPlanName(String userId, String planName);

  Optional<BusinessGrowthPlan> findByIdAndUserId(String planId, String userId);

  List<BusinessGrowthPlan> findAllByUserId(String userId);

  void deleteByUserIdAndPlanName(String id, String planName);
}
