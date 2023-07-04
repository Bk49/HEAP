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
public class DeleteMenuRequest {

    private String name;

}
