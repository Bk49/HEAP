package com.heap.backend.repository;

import com.heap.backend.models.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RecipeRepository extends MongoRepository<Recipe, String> {
  Optional<Recipe> findById(String Id);
  Optional<Recipe> findByIdAndName(String Id, String name);
}
