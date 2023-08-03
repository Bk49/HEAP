package com.heap.backend.models.business.outletexpansion;

import com.heap.backend.models.business.BusinessGrowthPlan;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("business")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@Data
public class OutletExpansionPlan extends BusinessGrowthPlan {
    //Specific to OutletExpansionPlan
    private String address;
    private Staff[] staffs;
    private double rentalPrice;
    private double renovation;

}
