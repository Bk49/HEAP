package com.heap.backend.data.response;

import com.heap.backend.models.Menu;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SingleMenuResponse implements Response {

    private Menu menu;

}
