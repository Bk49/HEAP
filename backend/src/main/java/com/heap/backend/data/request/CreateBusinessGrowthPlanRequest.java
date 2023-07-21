package com.heap.backend.data.request;

import com.heap.backend.models.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.File;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateBusinessGrowthPlanRequest {

    private String id;
    private String planName;
    private String startDate;
    private String endDate;
    private double budget;
    private int priority;
    private String planType;

    //1. Unique to FD (Food Delivery Marketplace Strategy)
    private String menuId;
    private Container[] containers;

    //2. Unique to MK (Marketing Strategy)
    private String method;
    private String promotionName;
    private String promoStartDate;
    private String promoEndDate;
    private String promoDescription;
    private String promoTnC;
    private Influencer[] influencer;
    //2.1. Unique to SocialMedia
    private String platform;
    private Content[] contents;
    private double platformCost;
    private double platformRate;
    private double platformDuration;
    //2.2. Unique to PosterBanner
    private String posterDesign;
    private double posterCost;
    private double posterQuantity;
    //2.3. Unique to FlyerDistribution
    private String flyerDesign;
    private double flyerCost;
    private double flyerQuantity;

    //3. Unique to OutletExpansion
    private String address;
    private Staff[] staffs;
    private double rentalPrice;
    private double renovation;

}
