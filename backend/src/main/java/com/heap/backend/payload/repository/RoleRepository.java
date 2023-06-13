package com.heap.backend.payload.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.heap.backend.models.ERole;
import com.heap.backend.models.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}
