package com.heap.backend.models;

import java.io.File;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Recipe {
    
    private String name;
    private String category;
    private double cost;
    private File image;
    private String description;
    private Ingredient[] ingredients;
    private Step[] steps;
}
