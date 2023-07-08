package com.heap.backend.data.response;

import com.heap.backend.models.Recipe;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SingleRecipeResponse implements Response {

    private Recipe recipe;

}
