package com.heap.backend.repository;

import com.heap.backend.models.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends MongoRepository<Recipe, String> {
  Optional<Recipe> findByNameAndUserId(String name, String userId);

  Optional<Recipe> findByUserIdAndId(String userId, String Id);

  List<Recipe> findAllByUserId(String userId);

  void deleteByUserIdAndId(String userId, String id);
}
