package com.heap.backend.models.business.marketing.posterbanner;

import com.heap.backend.models.business.BusinessGrowthPlan;
import com.heap.backend.models.business.marketing.common.MarketingPlan;
import com.heap.backend.models.business.marketing.common.Promotion;
import com.heap.backend.models.business.marketing.common.Influencer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("business")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@Data
public class PosterAndBannerMarketingPlan extends MarketingPlan {

    //Unique to PosterAndBannerMarketingPlan
    private PosterBanner posterBanner;

}
