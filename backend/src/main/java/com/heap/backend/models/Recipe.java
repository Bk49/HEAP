package com.heap.backend.models;

import java.io.File;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("recipe")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Recipe {

    private String name;
    private String category;
    private double cost;
//    private File image;
    private String description;
    private RecipeIngredient[] ingredients;
    private String[] steps;
}
