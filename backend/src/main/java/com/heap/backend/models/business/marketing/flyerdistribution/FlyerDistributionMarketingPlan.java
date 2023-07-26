package com.heap.backend.models.business.marketing.flyerdistribution;

import com.heap.backend.models.business.BusinessGrowthPlan;
import com.heap.backend.models.business.marketing.common.Influencer;
import com.heap.backend.models.business.marketing.common.Promotion;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("flyerDistributionMarketingPlan")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class FlyerDistributionMarketingPlan extends BusinessGrowthPlan {

    //Common Fields
    @Id
    private String id;
    @NotBlank
    private String userId;
    @NotBlank
    private String planName;
    @NotBlank
    private String startDate;
    @NotBlank
    private String endDate;
    @NotBlank
    private int priority;
    @NotBlank
    private String planType;
    private String createDateTime;

    //Common to all MarketingPlan
    private String method;
    private Promotion promotion;
    private Influencer[] influencer;

    //Unique to this FlyerDistributionMarketingPlan
    private Flyer flyer;


}
