package com.heap.backend.models;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
public class HEAPDate {

    @NotBlank
    private int $D;

    @NotBlank
    private int $M;

    @NotBlank
    private int $y;

    @Override
    public String toString() {
        String out = "";
        if ($D < 10) {out += "0";}
        out += $D + "/";
        if ($M < 10) {out += "0";}
        out += $M + "/";
        return out + $y;
    }

}
