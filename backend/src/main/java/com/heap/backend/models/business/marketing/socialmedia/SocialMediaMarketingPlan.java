package com.heap.backend.models.business.marketing.socialmedia;

import com.heap.backend.models.business.BusinessGrowthPlan;
import com.heap.backend.models.business.marketing.common.MarketingPlan;
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
public class SocialMediaMarketingPlan extends MarketingPlan {

    //Unique to SocialMediaMarketingPlan
    private SocialMedia socialMedia;

}
