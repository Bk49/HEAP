package com.heap.backend.models;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class Promotion {

    private String name;
    private String startDate;
    private String endDate;
    private String tnc;
    private String description;

}
