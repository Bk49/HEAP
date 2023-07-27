package com.heap.backend.models.business.outletexpansion;

import com.heap.backend.models.business.BusinessGrowthPlan;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("business")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class OutletExpansionPlan extends BusinessGrowthPlan {
    //Specific to OutletExpansionPlan
    private String address;
    private Staff[] staffs;
    private double rentalPrice;
    private double renovation;

}
