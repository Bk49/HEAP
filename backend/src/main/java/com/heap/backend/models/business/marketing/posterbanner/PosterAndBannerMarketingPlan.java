package com.heap.backend.models.business.marketing.posterbanner;

import com.heap.backend.models.business.BusinessGrowthPlan;
import com.heap.backend.models.business.marketing.common.Promotion;
import com.heap.backend.models.business.marketing.common.Influencer;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("business")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class PosterAndBannerMarketingPlan extends BusinessGrowthPlan {
    //Common to all MarketingPlan
    private String method;
    private Promotion promotion;
    private Influencer[] influencer;

    //Unique to PosterAndBannerMarketingPlan
    private PosterBanner posterBanner;

}
