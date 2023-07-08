package com.heap.backend.data.response;

import com.heap.backend.models.Recipe;
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
