package com.saloon.back_end.controller;

import com.saloon.back_end.model.dto.BookingInfoDto;
import com.saloon.back_end.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/customers/booking")


public class CustomerController {
    @Autowired
    BookingService bookingService;

    @GetMapping("/details")
    public List<BookingInfoDto> getBookingInfo(@RequestParam() String email){
        return bookingService.getBookingInfo(email);
    }

    @GetMapping("/amount")
    public int getAmount(@RequestParam() String email){
        return bookingService.getAmount(email);
    }
}
