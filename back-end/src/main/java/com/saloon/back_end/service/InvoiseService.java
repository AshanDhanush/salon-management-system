package com.saloon.back_end.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface InvoiseService {
    String buildInvoiceHtml(
             String title,
     double price,
     String duration,
     String category,
     String customerName,
     String customerEmail,
     String customerPhoneNumber,
     LocalDate date,
     LocalTime time
    );
    byte[] generateInvoicePdf(String html);
}
