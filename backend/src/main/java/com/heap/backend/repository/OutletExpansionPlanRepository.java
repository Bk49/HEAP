package com.heap.backend.repository;

import com.heap.backend.models.OutletExpansionPlan;
import com.heap.backend.models.SocialMediaMarketingPlan;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface OutletExpansionPlanRepository extends MongoRepository<OutletExpansionPlan, String> {

  Optional<OutletExpansionPlan> findByUserIdAndPlanName(String userId, String planName);

  Optional<OutletExpansionPlan> findByIdAndUserId(String planId, String userId);

  List<OutletExpansionPlan> findAllByUserId(String userId);

  void deleteByUserIdAndId(String id, String bgpId);
}
