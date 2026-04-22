package com.saloon.back_end.controller;

import com.saloon.back_end.model.dto.AuthResponse;
import com.saloon.back_end.model.dto.BookingInfoDto;
import com.saloon.back_end.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
@CrossOrigin("*")

public class BookingController {
  @Autowired
    BookingService bookingService;

  @GetMapping("/availability")
    public ResponseEntity<List<String>> checkAvailability(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
      return ResponseEntity.ok(bookingService.checkAvailability(date));
  }

  @PostMapping("/confirm")
  public ResponseEntity<?> confirm(@RequestBody BookingInfoDto bookingInfoDto){
    return  ResponseEntity.ok(bookingService.confirm(bookingInfoDto));
  }
}
