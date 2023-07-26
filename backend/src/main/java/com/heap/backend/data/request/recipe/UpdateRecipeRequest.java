package com.heap.backend.data.request.recipe;

import com.heap.backend.models.recipe.RecipeIngredient;
import com.heap.backend.models.recipe.RecipeSteps;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateRecipeRequest {
    private String name;
    private String category;
    private double cost;
    private String image;
    private String description;
    private RecipeIngredient[] ingredients;
    private RecipeSteps[] steps;
}
