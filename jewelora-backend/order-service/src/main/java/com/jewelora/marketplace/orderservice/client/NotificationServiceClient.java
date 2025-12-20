package com.jewelora.marketplace.orderservice.client;

import com.jewelora.marketplace.orderservice.dto.NotificationRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notification-service")
public interface NotificationServiceClient {

    @PostMapping("/jewelora/notifications/customer/order-placed")
    void sendCustomerOrderPlaced(@RequestBody NotificationRequest request);
    
    @PostMapping("/jewelora/notifications/customer/order-processed")
    void sendCustomerOrderProcessed(@RequestBody NotificationRequest request);

    @PostMapping("/jewelora/notifications/customer/order-dispatched")
    void sendCustomerOrderDispatched(@RequestBody NotificationRequest request);

    @PostMapping("/jewelora/notifications/customer/order-delivered")
    void sendCustomerOrderDelivered(@RequestBody NotificationRequest request);

    @PostMapping("/jewelora/notifications/delivery/order-assigned")
    void sendDeliveryAssigned(@RequestBody NotificationRequest request);
}