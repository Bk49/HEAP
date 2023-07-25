package com.heap.backend.data.response.menu;

import com.heap.backend.data.response.Response;
import com.heap.backend.models.menu.Menu;
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
