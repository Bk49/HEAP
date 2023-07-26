package com.heap.backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.heap.backend.models.user.User;

public interface UserRepository extends MongoRepository<User, String> {
  Optional<User> findByEmail(String email);
}
