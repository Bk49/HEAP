package com.heap.backend.models;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Item {
    
    private String item;
    private double price;

    public boolean equals(Item i) {
        return this.item.equals(i.item) && this.price == i.price;
    }
}
