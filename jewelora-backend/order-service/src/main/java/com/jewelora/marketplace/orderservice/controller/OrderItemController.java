package com.jewelora.marketplace.orderservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.jewelora.marketplace.orderservice.entity.OrderItem;
import com.jewelora.marketplace.orderservice.service.OrderItemService;

import java.util.List;

@RestController
@RequestMapping("/jewelora/order-items")
@RequiredArgsConstructor
public class OrderItemController {

    private final OrderItemService orderItemService;

    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<OrderItem>> getItemsByOrderId(@PathVariable("orderId") String orderId) {
        List<OrderItem> list = orderItemService.getItemsByOrderId(orderId);
        return ResponseEntity.ok(list);
    }
}
