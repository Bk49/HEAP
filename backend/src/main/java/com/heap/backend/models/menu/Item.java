package com.heap.backend.models.menu;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Item {
    
    private String item;
    private double price;

    public Item duplicate() {
        return Item.builder()
                .item(this.item)
                .price(this.price)
                .build();
    }
}
