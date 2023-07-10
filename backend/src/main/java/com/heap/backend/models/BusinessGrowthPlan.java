package com.heap.backend.models;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("businessGrowthPlan")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class BusinessGrowthPlan {

    @Id
    private String id;

    @NotBlank
    private String userId;

    @NotBlank
    private String planName;

    @NotBlank
    private HEAPDate startDate;

    @NotBlank
    private HEAPDate endDate;

    @NotBlank
    private int priority;

    @NotBlank
    private String method;

    @NotBlank
    private Strategy strategy;

}
