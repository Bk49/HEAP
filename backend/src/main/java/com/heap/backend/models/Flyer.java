package com.heap.backend.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class Flyer {

    private String design;
    private double cost;
    private double quantity;
    private String location;

}
