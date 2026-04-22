package com.saloon.back_end.service.Impl;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import com.saloon.back_end.service.InvoiseService;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Service
public class InvoiseServiceImpl implements InvoiseService {

    @Override
    public String buildInvoiceHtml(
            String title,
            double price,
            String duration,
            String category,
            String customerName,
            String customerEmail,
            String customerPhoneNumber,
            LocalDate date,
            LocalTime time
    ) {
        StringBuilder html = new StringBuilder();

        // 1. MUST start with XML and XHTML declarations for OpenHTMLtoPDF
        html.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        html.append("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">");
        html.append("<html xmlns=\"http://www.w3.org/1999/xhtml\">");

        html.append("""
            <head>
                <title>Invoice</title>
                <style>
                    body { font-family: 'Helvetica', sans-serif; color: #333; padding: 20px; }
                    .header { text-align: center; border-bottom: 2px solid #ec4899; padding-bottom: 10px; }
                    .salon-name { font-size: 24px; font-weight: bold; color: #7c3aed; }
                    .invoice-title { font-size: 18px; margin-top: 5px; color: #64748b; }
                    
                    .section { margin-top: 30px; }
                    .grid { width: 100%; margin-top: 20px; }
                    .label { font-weight: bold; color: #475569; width: 150px; }
                    
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 30px;
                    }
                    th {
                        background-color: #f8fafc;
                        color: #1e293b;
                        border-bottom: 2px solid #e2e8f0;
                        padding: 12px;
                        text-align: left;
                    }
                    td {
                        padding: 12px;
                        border-bottom: 1px solid #f1f5f9;
                    }
                    .total-section {
                        margin-top: 40px;
                        text-align: right;
                        padding-right: 20px;
                    }
                    .grand-total {
                        font-size: 20px;
                        font-weight: bold;
                        color: #ec4899;
                    }
                    .footer {
                        margin-top: 50px;
                        text-align: center;
                        font-size: 12px;
                        color: #94a3b8;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="salon-name">ELITE SALON PRO</div>
                    <div class="invoice-title">Service Confirmation &amp; Invoice</div>
                </div>

                <div class="section">
                    <table class="grid">
                        <tr>
                            <td class="label">Customer Name:</td>
                            <td>""").append(customerName).append("""
                            </td>
                            <td class="label">Date:</td>
                            <td>""").append(date.toString()).append("""
                            </td>
                        </tr>
                        <tr>
                            <td class="label">Email:</td>
                            <td>""").append(customerEmail).append("""
                            </td>
                            <td class="label">Time:</td>
                            <td>""").append(time.toString()).append("""
                            </td>
                        </tr>
                        <tr>
                            <td class="label">Phone:</td>
                            <td>""").append(customerPhoneNumber).append("""
                            </td>
                            <td class="label">Category:</td>
                            <td>""").append(category).append("""
                            </td>
                        </tr>
                    </table>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Service Description</th>
                            <th>Duration</th>
                            <th style="text-align: right;">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>""").append(title).append("""
                            </td>
                            <td>""").append(duration).append("""
                            </td>
                            <td style="text-align: right;">Rs. """).append(String.format("%.2f", price)).append("""
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="total-section">
                    <p>Subtotal: Rs. """).append(String.format("%.2f", price)).append("""
                    </p>
                    <p class="grand-total">Total Amount: Rs. """).append(String.format("%.2f", price)).append("""
                    </p>
                </div>

                <div class="footer">
                    <p>Thank you for choosing Elite Salon Pro.</p>
                    <p>Please arrive 10 minutes before your scheduled time.</p>
                </div>
            </body>
            </html>
            """);

        return html.toString();
    }
    @Override
    public byte[] generateInvoicePdf(String html) {
        try (ByteArrayOutputStream os = new ByteArrayOutputStream()) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useFastMode();
            builder.withHtmlContent(html, null);
            builder.toStream(os);
            builder.run();
            return os.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Salon Invoice PDF generation failed", e);
        }
    }
}