package com.heap.backend.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class MenuSection {
    private String name;
    private Item[] items;

    public boolean equals(MenuSection ms) {

        boolean equal = this.name.equals(ms.name) && this.items.length == ms.items.length;

        if (!equal) {
            return false;
        }

        for (int i = 0 ; i < items.length ; i++) {

            if (this.items[i].equals(ms.items[i])) {
                return false;
            }

        }

        return true;
    }
}
