package com.heap.backend.models;

import java.io.File;

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

//    @NotBlank
//    private File image;

    @NotBlank
    private String description;

    @NotBlank
    private RecipeIngredient[] ingredients;

    @NotBlank
    private String[] steps;

    public Recipe duplicate() {
        return Recipe.builder()
                .id(this.id)
                .userId(this.userId)
                .name(this.name)
                .category(this.category)
                .cost(this.cost)
                //.image(this.image)
                .description(this.description)
                .ingredients(this.ingredients.clone())
                .steps(this.steps.clone())
                .build();
    }
}
