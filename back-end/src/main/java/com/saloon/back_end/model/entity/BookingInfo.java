package com.saloon.back_end.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Document(collection = "Appointments")
@AllArgsConstructor
@NoArgsConstructor

public class BookingInfo {
    private String id;
    private String title;
    private double price;
    private String duration;
    private String category;
    private String customerName;
    private String customerEmail;
    private String customerPhoneNumber;
    private LocalDate date;
    private LocalTime time;
    private String status = "pending";
}
