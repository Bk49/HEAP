package com.heap.backend.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class MarketingStrategy implements Strategy {

    private String method;
    private MarketingMethod marketingMethod;

}
