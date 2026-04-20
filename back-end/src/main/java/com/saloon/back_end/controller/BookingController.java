package com.saloon.back_end.controller;

import com.saloon.back_end.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor

public class BookingController {
  @Autowired
    BookingService bookingService;

  @GetMapping("/availability")
    public ResponseEntity<List<String>> checkAvailability(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
      return ResponseEntity.ok(bookingService.checkAvailability(date));
  }
}
