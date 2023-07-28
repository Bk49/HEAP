package com.heap.backend.repository.business;

import com.heap.backend.models.business.BusinessGrowthPlan;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface BusinessRepository<T extends BusinessGrowthPlan> extends MongoRepository<T, String> {
    Optional<BusinessGrowthPlan> findByUserIdAndPlanName(String userId, String planName);

    Optional<BusinessGrowthPlan> findByIdAndUserId(String planId, String userId);

    List<BusinessGrowthPlan> findAllByUserId(String userId, Sort sort);

    void deleteByUserIdAndId(String id, String bgpId);
}
