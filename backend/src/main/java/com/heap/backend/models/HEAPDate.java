package com.heap.backend.models;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Builder
@Data
public class HEAPDate {

    @NotBlank
    private int day;

    @NotBlank
    private int month;

    @NotBlank
    private int year;

    public HEAPDate(int $D, int $M, int $y) {
        this.day = $D;
        this.month = $M + 1;
        this.year = $y;
    }

//    @Override
//    public String toString() {
//        String out = "";
//        if ($D < 10) {out += "0";}
//        out += $D + "/";
//        if ($M < 10) {out += "0";}
//        out += $M + "/";
//        return out + $y;
//    }

    @Override
    public String toString() {
        String out = "";
        if (day < 10) {out += "0";}
        out += day + "/";
        if (month < 10) {out += "0";}
        out += month + "/";
        return out + year;
    }

}
