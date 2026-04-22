package com.saloon.back_end.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor


public class BookingInfoDto {
    private String title;
    private double price;
    private String duration;
    private String category;
    private String customerName;
    private String customerEmail;
    private String customerPhoneNumber;
    private LocalDate date;
    private LocalTime time;
}
