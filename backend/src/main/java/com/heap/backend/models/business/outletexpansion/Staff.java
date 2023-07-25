package com.heap.backend.models.business.outletexpansion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Staff {
    
    private String name;
    private String hiringMethod;
    private String position;

}
