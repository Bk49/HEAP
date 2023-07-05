package com.heap.backend.repository;

import com.heap.backend.models.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RecipeRepository extends MongoRepository<Recipe, String> {
  Optional<Recipe> findByNameAndUserId(String name, String userId);
  Optional<Recipe> findByUserIdAndName(String userId, String name);

  Optional<Recipe> findByUserIdAndId(String userId, String Id);

  void deleteByUserIdAndName(String userId, String name);
}