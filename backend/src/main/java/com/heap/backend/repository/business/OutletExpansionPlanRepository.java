package com.heap.backend.repository.business;

import com.heap.backend.models.business.outletexpansion.OutletExpansionPlan;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface OutletExpansionPlanRepository extends MongoRepository<OutletExpansionPlan, String> {

  Optional<OutletExpansionPlan> findByUserIdAndPlanName(String userId, String planName);

  Optional<OutletExpansionPlan> findByIdAndUserId(String planId, String userId);

  List<OutletExpansionPlan> findAllByUserId(String userId);

  void deleteByUserIdAndId(String id, String bgpId);
}
