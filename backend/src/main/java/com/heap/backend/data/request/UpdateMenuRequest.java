package com.heap.backend.data.request;

import com.heap.backend.models.MenuSection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateMenuRequest {

    private String name;
    private MenuSection[] sections;
    private String type;

}
