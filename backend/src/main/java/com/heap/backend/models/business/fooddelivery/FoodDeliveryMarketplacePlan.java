package com.heap.backend.models.business.fooddelivery;

import com.heap.backend.models.business.BusinessGrowthPlan;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("foodDeliveryMarketplacePlan")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class FoodDeliveryMarketplacePlan extends BusinessGrowthPlan {

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

    //Unique to FoodDeliveryMarketplacePlan
    private String menuId;
    private Container[] containers;

}
