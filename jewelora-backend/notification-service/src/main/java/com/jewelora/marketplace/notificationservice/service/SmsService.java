package com.jewelora.marketplace.notificationservice.service;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class SmsService {

    @Value("${twilio.from-number}")
    private String fromNumber;

    @Async
    public void sendSms(String phone, String message) {
        try {
            Message.creator(
                    new PhoneNumber(phone),
                    new PhoneNumber(fromNumber),
                    message
            ).create();

            log.info("SMS sent successfully to {} | message={}", phone, message);

        } catch (Exception e) {
            log.error("Failed to send SMS to {} | reason={}", phone, e.getMessage(), e);
        }
    }
}
