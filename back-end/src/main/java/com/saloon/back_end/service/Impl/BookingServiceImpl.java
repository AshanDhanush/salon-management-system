package com.saloon.back_end.service.Impl;

import com.saloon.back_end.model.entity.BookingInfo;
import com.saloon.back_end.repository.BookingInfoRepository;
import com.saloon.back_end.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    BookingInfoRepository repository;

    @Override
    public List<String> checkAvailability(LocalDate date) {

        List<String> allSlots = List.of("09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM");


        List<BookingInfo> existingAppointments = repository.findByDate(date);


        List<String> takenTimes = existingAppointments.stream()
                .map(apps -> apps.getTime().toString())
                .collect(Collectors.toList());

        return allSlots.stream()
                .filter(slot -> !takenTimes.contains(slot))
                .collect(Collectors.toList());
    }
}
