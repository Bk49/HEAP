package com.heap.backend.models;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("menu")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class StoredMenu {

    @Id
    private String id;

    @NotBlank
    private String userId;

    @NotBlank
    private String name;

    @NotBlank
    private StoredMenuSection[] sections;

    @NotBlank
    private String type;

}
