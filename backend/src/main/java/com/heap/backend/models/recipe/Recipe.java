package com.heap.backend.models.recipe;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("recipe")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Recipe {

    @Id
    private String id;

    @NotBlank
    private String userId;

    @NotBlank
    private String name;

    @NotBlank
    private String category;

    @NotBlank
    private double cost;

    @NotBlank
    private String image;

    @NotBlank
    private String description;

    @NotBlank
    private RecipeIngredient[] ingredients;

    @NotBlank
    private RecipeSteps[] steps;

    private String createDateTime;
}
