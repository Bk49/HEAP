package com.heap.backend.models;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("outletExpansionPlan")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class OutletExpansionPlan implements BusinessGrowthPlan {

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

    //Specific to OutletExpansionPlan
    private String planType;
    private String address;
    private Staff[] staffs;
    private double rentalPrice;
    private double renovation;

}
