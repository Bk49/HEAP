package com.heap.backend.models.business.fooddelivery;

import com.heap.backend.models.business.BusinessGrowthPlan;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("business")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class FoodDeliveryMarketplacePlan extends BusinessGrowthPlan {
    //Unique to FoodDeliveryMarketplacePlan
    private String menuId;
    private Container[] containers;

}
