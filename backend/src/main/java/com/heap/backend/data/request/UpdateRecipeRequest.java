package com.heap.backend.data.request;

import com.heap.backend.models.RecipeIngredient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.File;

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
    private String[] steps;
}
