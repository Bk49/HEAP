package com.heap.backend.models.business.marketing.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Influencer {

    private String name;
    private String email;
    private int phone;

}