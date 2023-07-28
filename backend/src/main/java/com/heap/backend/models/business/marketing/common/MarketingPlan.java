package com.heap.backend.models.business.marketing.common;

import com.heap.backend.models.business.BusinessGrowthPlan;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("business")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class MarketingPlan extends BusinessGrowthPlan {

    //Common to all MarketingPlan
    private String method;
    private Promotion promotion;
    private Influencer[] influencer;
}
