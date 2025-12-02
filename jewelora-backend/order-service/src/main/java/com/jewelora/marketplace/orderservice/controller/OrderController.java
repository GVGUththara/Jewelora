package com.jewelora.marketplace.orderservice.controller;

import com.jewelora.marketplace.orderservice.dto.OrderCreateRequest;
import com.jewelora.marketplace.orderservice.dto.UpdateOrderStatusRequest;
import com.jewelora.marketplace.orderservice.entity.Order;
import com.jewelora.marketplace.orderservice.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jewelora/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // Create Order
    @PostMapping("/create-order")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<Order> createOrder(@Valid @RequestBody OrderCreateRequest request) {
        return ResponseEntity.status(201).body(orderService.createOrder(request));
    }

    // Get Order By ID
    @GetMapping("/get-order/{orderId}")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<Order> getOrderById(@PathVariable("orderId") String orderId) {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }

    // Get All
    @GetMapping("/get-all-order")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    // Delete → Cancel
    @DeleteMapping("/cancel-order/{orderId}")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<String> cancelOrder(@PathVariable("orderId") String orderId) {
        return ResponseEntity.ok(orderService.cancelOrder(orderId));
    }
    
    // Get Order By Customer
    @GetMapping("/get-order-customer/{customerId}")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<List<Order>> getOrdersByCustomer(@PathVariable("customerId") String customerId) {
        return ResponseEntity.ok(orderService.getOrdersByCustomer(customerId));
    }

    // Update order status with validation
    @PutMapping("update-order-status/{orderId}/status")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable("orderId") String orderId,
            @RequestBody UpdateOrderStatusRequest request) {

        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, request));
    }
}