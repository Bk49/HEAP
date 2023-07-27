package com.heap.backend.models.business.marketing.flyerdistribution;

import com.heap.backend.models.business.BusinessGrowthPlan;
import com.heap.backend.models.business.marketing.common.Influencer;
import com.heap.backend.models.business.marketing.common.Promotion;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("business")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class FlyerDistributionMarketingPlan extends BusinessGrowthPlan {

    //Common to all MarketingPlan
    private String method;
    private Promotion promotion;
    private Influencer[] influencer;

    //Unique to this FlyerDistributionMarketingPlan
    private Flyer flyer;
}