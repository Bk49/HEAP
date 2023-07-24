package com.heap.backend.models;

import java.time.LocalDateTime;

public class HEAPDate {
    private int year;
    private int month;
    private int day;
    private int hour;
    private int minute;
    private int second;

    public HEAPDate() {
        LocalDateTime current = LocalDateTime.now();
        this.year = current.getYear();
        this.month = current.getMonthValue();
        this.day = current.getDayOfMonth();
        this.hour = current.getHour();
        this.minute = current.getMinute();
        this.second = current.getSecond();
    }

    public HEAPDate(int year, int month, int day, int hour, int minute, int second) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }

    @Override
    public String toString() {
        String[] values = {("" + this.year), ("" + this.month),
                           ("" + this.day), ("" + this.hour),
                           ("" + this.minute), ("" + this.second)};

        if (values[0].length() < 4) {
            values[0] = "0" + values[0];
        }

        for (int i = 1 ; i < 6 ; i++) {
            if (values[i].length() < 2) {
                values[i] = "0" + values[i];
            }
        }

        String out = "";
        out += values[0];
        for (int i  = 1 ; i < 3 ; i++) {
            out += "/" + values[i];
        }
        out += " " + values[3];
        for (int i = 4 ; i < 6 ; i++) {
            out += ":" + values[i];
        }

        return out;
    }
}
