package com.heap.backend.data.response.business;

import com.heap.backend.data.response.Response;
import com.heap.backend.models.business.BusinessGrowthPlan;
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
