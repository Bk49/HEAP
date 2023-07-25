package com.heap.backend.data.response.business;

import com.heap.backend.data.response.Response;
import com.heap.backend.models.business.BusinessGrowthPlan;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MultipleBusinessGrowthPlanResponse implements Response {

    private List<BusinessGrowthPlan> businessGrowthPlans;

}
