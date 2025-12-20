package com.jewelora.marketplace.notificationservice.controller;

import com.jewelora.marketplace.notificationservice.dto.SmsRequest;
import com.jewelora.marketplace.notificationservice.service.SmsService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/jewelora/notifications")
public class NotificationController {

    private final SmsService smsService;

    public NotificationController(SmsService smsService) {
        this.smsService = smsService;
    }

    @PostMapping("/customer/order-placed")
    public void customerOrderPlaced(@RequestBody SmsRequest request) {

        String message =
            "Your order " + request.getOrderId()
            + " has been placed successfully. "
            + "Your total payment will be Rs. "
            + request.getTotalAmount();

        smsService.sendSms(request.getPhone(), message);
    }

    @PostMapping("/customer/order-processed")
    public void customerOrderProcessed(@Valid @RequestBody SmsRequest request) {
        String message = "Your order " + request.getOrderId()
                + " has been processed.";
        smsService.sendSms(request.getPhone(), message);
    }

    @PostMapping("/customer/order-dispatched")
    public void customerOrderDispatched(@RequestBody SmsRequest request) {

        String message =
            "Your order " + request.getOrderId()
            + " has been dispatched.";

        smsService.sendSms(request.getPhone(), message);
    }

    @PostMapping("/customer/order-delivered")
    public void customerOrderDelivered(@RequestBody SmsRequest request) {
        String message = "Your order " + request.getOrderId() + " has been delivered. "
        		+ "Thank you for shopping at Jewelora.";
        smsService.sendSms(request.getPhone(), message);
    }

    @PostMapping("/delivery/order-assigned")
    public void deliveryOrderAssigned(@RequestBody SmsRequest request) {
        String message = "New order assigned: " + request.getOrderId();
        smsService.sendSms(request.getPhone(), message);
    }
}
