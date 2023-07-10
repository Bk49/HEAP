package com.heap.backend.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class FoodDeliveryMarketplaceStrategy implements Strategy{

    private String menuId;
    private Container[] containers;

}
