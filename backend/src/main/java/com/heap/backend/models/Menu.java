package com.heap.backend.models;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("menu")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class Menu {

    @Id
    private String id;

    @NotBlank
    private String userId;

    @NotBlank
    private String name;

    @NotBlank
    private MenuSection[] sections;

    @NotBlank
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
