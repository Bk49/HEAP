package com.heap.backend.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.File;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class FlyerDistributionMarketingMethod implements MarketingMethod {

    //Common to all
    private String promotionName;
    private HEAPDate promoStartDate;
    private HEAPDate promoEndDate;
    private String promoDescription;
    private String promoTnC;
    private Influencer[] influencer;

    //Unique to this
    private String flyerDesign;
    private double flyerCost;
    private double flyerQuantity;

}
