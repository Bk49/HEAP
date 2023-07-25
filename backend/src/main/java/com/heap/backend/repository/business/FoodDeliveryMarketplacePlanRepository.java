package com.heap.backend.repository.business;

import com.heap.backend.models.business.fooddelivery.FoodDeliveryMarketplacePlan;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface FoodDeliveryMarketplacePlanRepository extends MongoRepository<FoodDeliveryMarketplacePlan, String> {

  Optional<FoodDeliveryMarketplacePlan> findByUserIdAndPlanName(String userId, String planName);

  Optional<FoodDeliveryMarketplacePlan> findByIdAndUserId(String planId, String userId);

  List<FoodDeliveryMarketplacePlan> findAllByUserId(String userId);

  void deleteByUserIdAndId(String id, String bgpId);
}
