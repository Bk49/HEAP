package com.heap.backend.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class SocialMediaMarketingMethod implements MarketingMethod {

    //Common to all
    private String promotionName;
    private HEAPDate promoStartDate;
    private HEAPDate promoEndDate;
    private String promoDescription;
    private String promoTnC;
    private Influencer[] influencer;

    //Unique to this
    private String platform;
    private Content[] contents;
    private double platformCost;
    private double platformRate;
    private double platformDuration;

}
