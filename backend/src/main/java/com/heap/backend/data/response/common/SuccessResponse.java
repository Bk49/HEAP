package com.heap.backend.data.response.common;

import com.heap.backend.data.response.Response;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SuccessResponse implements Response {
    protected String response;
}
