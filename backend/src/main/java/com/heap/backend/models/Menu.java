package com.heap.backend.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class Menu {
    
    private String name;
    private MenuSection[] sections;
    private String type;

    public boolean equals(Menu menu) {

        boolean equal = this.name.equals(menu.name) && type.equals(menu.name) && this.sections.length == menu.sections.length;

        if (!equal) {
            return false;
        }

        for (int i = 0 ; i < menu.sections.length ; i++) {

            if (this.sections[i].equals(menu.sections[i])) {
                return false;
            }

        }

        return true;
    }
}
