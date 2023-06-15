package com.heap.backend.models;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("business")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Business {

    private String businessName;

    private String businessType;

    private String[] cuisineType;

    private boolean isFusion;

    private String storeAddress;

    @Size(max = 6)
    private String postalCode;
}
