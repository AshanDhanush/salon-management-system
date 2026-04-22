package com.saloon.back_end.service;

public interface NotificationService {
    void sendEmailWithInvoice(String recipient, byte[] pdfContent);
}
