package com.saloon.back_end.service;

import com.saloon.back_end.model.dto.AuthResponse;
import com.saloon.back_end.model.dto.BookingInfoDto;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {
    List<String> checkAvailability(LocalDate date);

    boolean confirm(BookingInfoDto bookingInfoDto);
}
