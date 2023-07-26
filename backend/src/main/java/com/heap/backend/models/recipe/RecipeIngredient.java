package com.heap.backend.models.recipe;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class RecipeIngredient {

    private String name;
    private String unit;
    private double quantity;
}
