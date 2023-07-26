package com.heap.backend.models.recipe;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class RecipeSteps {

    private String text;

    public RecipeSteps duplicate() {
        return RecipeSteps.builder()
                .text(this.text)
                .build();
    }
}
