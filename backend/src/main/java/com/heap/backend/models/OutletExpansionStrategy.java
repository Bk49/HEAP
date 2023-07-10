package com.heap.backend.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class OutletExpansionStrategy implements Strategy {

    private String address;
    private Staff[] staffs;
    private double rentalPrice;
    private double renovation;

}
