package com.saloon.back_end.service.Impl;

import com.saloon.back_end.model.dto.AuthResponse;
import com.saloon.back_end.model.dto.BookingInfoDto;
import com.saloon.back_end.model.entity.BookingInfo;
import com.saloon.back_end.repository.BookingInfoRepository;
import com.saloon.back_end.service.BookingService;
import com.saloon.back_end.service.InvoiseService;
import com.saloon.back_end.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    BookingInfoRepository repository;

    @Autowired
    InvoiseService invoiseService;

    @Autowired
    NotificationService notificationService;

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

    @Override
    @Transactional
    public boolean confirm(BookingInfoDto bookingInfoDto) {
        if(bookingInfoDto == null){
            return false;
        }
        try {
            BookingInfo bookingInfo = new BookingInfo(
                    null,
                    bookingInfoDto.getTitle(),
                    bookingInfoDto.getPrice(),
                    bookingInfoDto.getDuration(),
                    bookingInfoDto.getCategory(),
                    bookingInfoDto.getCustomerName(),
                    bookingInfoDto.getCustomerEmail(),
                    bookingInfoDto.getCustomerPhoneNumber(),
                    bookingInfoDto.getDate(),
                    bookingInfoDto.getTime(),
                    "PENDING"
            );
            repository.save(bookingInfo);

             String html = invoiseService.buildInvoiceHtml(
                    bookingInfo.getTitle(),
                    bookingInfo.getPrice(),
                    bookingInfo.getDuration(),
                    bookingInfo.getCategory(),
                    bookingInfo.getCustomerName(),
                    bookingInfo.getCustomerEmail(),
                    bookingInfo.getCustomerPhoneNumber(),
                    bookingInfo.getDate(),
                    bookingInfo.getTime()
            );
            byte[] pdfBytes = invoiseService.generateInvoicePdf(html);

            notificationService.sendEmailWithInvoice(bookingInfo.getCustomerEmail(),pdfBytes);


            return true;

        }catch(Exception e){
            throw new RuntimeException("Failed to save booking informations", e);

        }

    }

    @Override
    public List<BookingInfoDto> getBookingInfo(String email) {
       List<BookingInfo> bookingInfos =  repository.findByCustomerEmail(email);
       List<BookingInfoDto> bookingInfoDtos = new ArrayList<>();
        BookingInfoDto bookingInfoDto;
       for(BookingInfo b : bookingInfos){
            bookingInfoDto = new BookingInfoDto(
                   b.getTitle(),
                   b.getPrice(),
                   b.getDuration(),
                   b.getCategory(),
                   b.getCustomerName(),
                   b.getCustomerEmail(),
                   b.getCustomerPhoneNumber(),
                   b.getDate(),
                   b.getTime()
           );
           bookingInfoDtos.add(bookingInfoDto);
       }
       return bookingInfoDtos;
    }

    @Override
    public int getAmount(String email) {
        List<BookingInfo> bookingInfos = repository.findByCustomerEmail(email);
        return bookingInfos.size();
    }
}
