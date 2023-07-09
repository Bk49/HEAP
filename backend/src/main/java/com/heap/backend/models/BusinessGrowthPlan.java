package com.heap.backend.models;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document("businessGrowthPlan")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class BusinessGrowthPlan {

    @Id
    private String id;

    @NotBlank
    private String planName;

    @NotBlank
    private Date startDate;

    @NotBlank
    private Date endDate;

    @NotBlank
    private int priority;

    @NotBlank
    private String method;

    @NotBlank
    private Strategy strategy;

}
