package com.heap.backend.data.request;

import com.heap.backend.models.Container;
import com.heap.backend.models.HEAPDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    //Unique to FD (Food Delivery Marketplace Strategy)
    private String menuId;
    private Container[] containers;
}
