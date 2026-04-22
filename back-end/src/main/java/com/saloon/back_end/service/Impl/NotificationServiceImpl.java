package com.saloon.back_end.service.Impl;

import com.saloon.back_end.service.NotificationService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    JavaMailSender mailSender;


    @Override
    public void sendEmailWithInvoice(String recipient, byte[] pdfContent) {


        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(recipient);
            helper.setSubject("Booking Confirmed - Elite Salon Pro");
            helper.setText("Hi! Your appointment is confirmed. Please find your invoice attached.");

            // Add the PDF attachment
            helper.addAttachment("Invoice.pdf", new ByteArrayResource(pdfContent));

            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Email failed but booking was saved: " + e.getMessage());
        }

    }
}
