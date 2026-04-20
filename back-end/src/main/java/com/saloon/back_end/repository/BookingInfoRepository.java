package com.saloon.back_end.repository;

import com.saloon.back_end.model.entity.BookingInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingInfoRepository extends MongoRepository<BookingInfo,String> {

    List<BookingInfo> findByDate(LocalDate date);
}
