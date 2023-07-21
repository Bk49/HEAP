package com.heap.backend.repository;

import com.heap.backend.models.BusinessGrowthPlan;
import com.heap.backend.models.SocialMediaMarketingPlan;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface SocialMediaMarketingPlanRepository extends MongoRepository<SocialMediaMarketingPlan, String> {

  Optional<SocialMediaMarketingPlan> findByUserIdAndPlanName(String userId, String planName);

  Optional<SocialMediaMarketingPlan> findByIdAndUserId(String planId, String userId);

  List<SocialMediaMarketingPlan> findAllByUserId(String userId);

  void deleteByUserIdAndId(String id, String bgpId);
}
