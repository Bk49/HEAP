package com.heap.backend.data.response.recipe;

import com.heap.backend.data.response.Response;
import com.heap.backend.models.recipe.Recipe;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MultipleRecipeResponse implements Response {

    private List<Recipe> recipes;

}
