package com.heap.backend.models.business.fooddelivery;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Container {
    
    private String containerName;
    private String vendorName;
    private double price;
    private double quantity;
}
