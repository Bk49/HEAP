package com.heap.backend.data.response;

import com.heap.backend.models.BusinessGrowthPlan;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SingleBusinessGrowthPlanResponse implements Response {

    private BusinessGrowthPlan businessGrowthPlan;

}
