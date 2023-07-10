package com.heap.backend.data.request;

import com.heap.backend.models.Container;
import com.heap.backend.models.Content;
import com.heap.backend.models.HEAPDate;
import com.heap.backend.models.Influencer;
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
    private HEAPDate startDate;
    private HEAPDate endDate;
    private int priority;
    private String planType;

    //1. Unique to FD (Food Delivery Marketplace Strategy)
    private String menuId;
    private Container[] containers;

    //2. Unique to MK (Marketing Strategy)
    private String method;
    private String promotionName;
    private HEAPDate promoStartDate;
    private HEAPDate promoEndDate;
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
//    private File posterDesign;
    private double posterCost;
    private double posterQuantity;
    //2.3. Unique to FlyerDistribution
//    private File flyerDesign;
    private double flyerCost;
    private double flyerQuantity;


}
