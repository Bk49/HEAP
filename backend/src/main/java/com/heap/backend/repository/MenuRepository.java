package com.heap.backend.repository;

import com.heap.backend.models.Menu;
import com.heap.backend.models.StoredMenu;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface MenuRepository extends MongoRepository<StoredMenu, String> {

    Optional <StoredMenu> findById(String id);
    Optional<StoredMenu> findByUserIdAndName(String userId, String name);

    Optional<StoredMenu> findByIdAndUserId(String id, String userId);

    List<StoredMenu> findAllByUserId(String userId);

    void deleteByUserIdAndId(String userId, String id);
}
