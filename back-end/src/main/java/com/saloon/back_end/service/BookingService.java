package com.saloon.back_end.service;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {
    List<String> checkAvailability(LocalDate date);
}
