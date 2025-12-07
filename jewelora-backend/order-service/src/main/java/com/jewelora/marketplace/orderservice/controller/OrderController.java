package com.jewelora.marketplace.orderservice.controller;

import com.jewelora.marketplace.orderservice.dto.AssignDeliveryPersonRequest;
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
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN') or hasRole('CUSTOMER') or hasRole('DELIVERY_PERSON')")
    public ResponseEntity<Order> getOrderById(@PathVariable("orderId") String orderId) {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }
      
    // Get Order By Customer
    @GetMapping("/get-order-customer/{customerId}")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN') or hasRole('CUSTOMER') or hasRole('DELIVERY_PERSON')")
    public ResponseEntity<List<Order>> getOrdersByCustomer(@PathVariable("customerId") String customerId) {
        return ResponseEntity.ok(orderService.getOrdersByCustomer(customerId));
    }

    // Get All
    @GetMapping("/get-all-order")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }   
    
 // Get Orders by Delivery Person
    @GetMapping("/get-orders-by-delivery-person/{deliveryPersonId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DELIVERY_PERSON')")
    public ResponseEntity<List<Order>> getOrdersByDeliveryPerson(
            @PathVariable("deliveryPersonId") String deliveryPersonId) {
        List<Order> orders = orderService.getOrdersByDeliveryPerson(deliveryPersonId);
        return ResponseEntity.ok(orders);
    }
    
    // Get Assigned Orders by Delivery Person
    @GetMapping("/get-assigned-orders/{deliveryPersonId}")
    @PreAuthorize("hasRole('DELIVERY_PERSON') or hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getAssignedOrders(@PathVariable("deliveryPersonId") String deliveryPersonId) {
        return ResponseEntity.ok(orderService.getAssignedOrders(deliveryPersonId));
    }

    // Get Delivered Orders by Delivery Person
    @GetMapping("/get-delivered-orders/{deliveryPersonId}")
    @PreAuthorize("hasRole('DELIVERY_PERSON') or hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getDeliveredOrders(@PathVariable("deliveryPersonId") String deliveryPersonId) {
        return ResponseEntity.ok(orderService.getDeliveredOrders(deliveryPersonId));
    }

    // Delete → Cancel
    @DeleteMapping("/cancel-order/{orderId}")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<String> cancelOrder(@PathVariable("orderId") String orderId) {
        return ResponseEntity.ok(orderService.cancelOrder(orderId));
    }

    // Update order status with validation
    @PutMapping("update-order-status/{orderId}/status")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN') or hasRole('DELIVERY_PERSON')")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable("orderId") String orderId,
            @RequestBody UpdateOrderStatusRequest request) {

        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, request));
    }
    
    // Assign Delivery Person
    @PutMapping("/assign-delivery-person/{orderId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('INVENTORY_MANAGER')")
    public ResponseEntity<Order> assignDeliveryPerson(
            @PathVariable("orderId") String orderId,
            @Valid @RequestBody AssignDeliveryPersonRequest request) {

        return ResponseEntity.ok(orderService.assignDeliveryPerson(orderId, request));
    }

}