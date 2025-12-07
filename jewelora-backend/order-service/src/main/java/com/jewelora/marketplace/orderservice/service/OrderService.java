package com.jewelora.marketplace.orderservice.service;

import com.jewelora.marketplace.orderservice.dto.AssignDeliveryPersonRequest;
import com.jewelora.marketplace.orderservice.dto.CustomerAddressUpdateRequest;
import com.jewelora.marketplace.orderservice.dto.OrderCreateRequest;
import com.jewelora.marketplace.orderservice.dto.UpdateOrderStatusRequest;
import com.jewelora.marketplace.orderservice.dto.ProductStockUpdateRequest;
import com.jewelora.marketplace.orderservice.entity.Order;
import com.jewelora.marketplace.orderservice.entity.OrderItem;
import com.jewelora.marketplace.orderservice.enums.OrderStatus;
import com.jewelora.marketplace.orderservice.repository.OrderRepository;
import com.jewelora.marketplace.orderservice.repository.OrderItemRepository;
import com.jewelora.marketplace.orderservice.client.CustomerServiceClient;
import com.jewelora.marketplace.orderservice.client.ProductServiceClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductServiceClient productServiceClient;
    private final CustomerServiceClient customerServiceClient; 

    @Transactional
    // Create Order
    public Order createOrder(OrderCreateRequest request) {
    	
    	// Calculate totalAmount from items
    	BigDecimal totalAmount = request.getItems().stream()
                .map(item -> {
                    BigDecimal discount = item.getProductDiscount() != null ? item.getProductDiscount() : BigDecimal.ZERO;

                    // percentage discount: unitPrice * (discount / 100)
                    BigDecimal discountAmount = item.getUnitPrice()
                            .multiply(discount)
                            .divide(BigDecimal.valueOf(100));

                    BigDecimal finalPricePerUnit = item.getUnitPrice().subtract(discountAmount);

                    return finalPricePerUnit.multiply(BigDecimal.valueOf(item.getQuantity()));
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        Order order = Order.builder()
                .customerId(request.getCustomerId())
                .customerContact(request.getCustomerContact()) 
                .totalAmount(totalAmount)
                .orderStatus(OrderStatus.PENDING)
                .streetNumber(request.getStreetNumber())
                .streetName1(request.getStreetName1())
                .streetName2(request.getStreetName2())
                .city(request.getCity())
                .postalCode(request.getPostalCode())
                .build();

        Order savedOrder = orderRepository.save(order);

        // Create Order Items
        List<OrderItem> orderItems = request.getItems()
                .stream()
                .map(itemReq -> {

                    // Call product-service to update stock & soldCount
                	productServiceClient.updateStock(
                	        itemReq.getProductId(),
                	        new ProductStockUpdateRequest(itemReq.getQuantity())
                	);


                    // Calculate final price
                    BigDecimal discount = itemReq.getProductDiscount() != null ? itemReq.getProductDiscount() : BigDecimal.ZERO;

                    BigDecimal discountAmount = itemReq.getUnitPrice()
                            .multiply(discount)
                            .divide(BigDecimal.valueOf(100));

                    BigDecimal finalUnitPrice = itemReq.getUnitPrice().subtract(discountAmount);

                    BigDecimal finalPrice = finalUnitPrice.multiply(BigDecimal.valueOf(itemReq.getQuantity()));


                    // Create order item
                    return OrderItem.builder()
                            .orderId(savedOrder.getId())
                            .productId(itemReq.getProductId())
                            .productName(itemReq.getProductName())
                            .quantity(itemReq.getQuantity())
                            .unitPrice(itemReq.getUnitPrice())
                            .productDiscount(itemReq.getProductDiscount())
                            .finalPrice(finalPrice)
                            .build();
                })
                .collect(Collectors.toList());

        // Save all order items
        orderItemRepository.saveAll(orderItems);

     // Update customer address/contact in customer-service
        try {
            CustomerAddressUpdateRequest customerUpdate = new CustomerAddressUpdateRequest();
            customerUpdate.setStreetNumber(request.getStreetNumber());
            customerUpdate.setStreetName1(request.getStreetName1());
            customerUpdate.setStreetName2(request.getStreetName2());
            customerUpdate.setCity(request.getCity());
            customerUpdate.setPostalCode(request.getPostalCode());
            customerUpdate.setContactNumber(request.getCustomerContact());

            customerServiceClient.updateCustomerAddress(
                    request.getCustomerId(),
                    customerUpdate
            );

        } catch (Exception e) {
            System.err.println("Failed to update customer info: " + e.getMessage());
        }
        
        return savedOrder;
    }

    // Get Order By ID
    public Order getOrderById(String orderId) {
    	Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Force load items
        order.getOrderItems().size();

        return order;
    }
    
    // Get Order By Customer
    public List<Order> getOrdersByCustomer(String customerId) {
    	List<Order> orders = orderRepository.findByCustomerId(customerId);

        // Force load items for each order
        orders.forEach(o -> o.getOrderItems().size());

        return orders;
    }
    
    // Get All
    public List<Order> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        
        orders.forEach(o -> o.getOrderItems().size());
        
        return orders;
    }
    
    public List<Order> getOrdersByDeliveryPerson(String deliveryPersonId) {
        List<Order> orders = orderRepository.findByDeliveryPersonId(deliveryPersonId);

        orders.forEach(o -> o.getOrderItems().size());

        return orders;
    }
    
    // Delete → Cancel
    public String cancelOrder(String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setOrderStatus(OrderStatus.CANCELLED);
        order.setUpdatedAt(LocalDateTime.now());
        orderRepository.save(order);

        return "Order cancelled successfully";
    }

    // Update order status with validation
    public Order updateOrderStatus(String orderId, UpdateOrderStatusRequest request) {

        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));

        OrderStatus current = order.getOrderStatus();
        OrderStatus next;

        try {
            next = OrderStatus.valueOf(request.getNewStatus());
        } catch (Exception e) {
            throw new RuntimeException("Invalid order status");
        }

        if (!isValidTransition(current, next)) {
            throw new RuntimeException(
                "Invalid status update: " + current + " → " + next
            );
        }
        
        if (next == OrderStatus.DISPATCHED && order.getDeliveryPersonId() == null) {
            throw new RuntimeException("Assign a delivery person before dispatching the order");
        }

        order.setOrderStatus(next);
        order.setUpdatedAt(LocalDateTime.now());
        
        if (next == OrderStatus.DELIVERED) {
            order.setDeliveredDate(LocalDateTime.now());
        }
        
        return orderRepository.save(order);
    }

    private boolean isValidTransition(OrderStatus current, OrderStatus next) {
        return switch (current) {
            case PENDING -> next == OrderStatus.PROCESSED || next == OrderStatus.CANCELLED;
            case PROCESSED -> next == OrderStatus.DISPATCHED || next == OrderStatus.CANCELLED;
            case DISPATCHED -> next == OrderStatus.DELIVERED;
            case DELIVERED, CANCELLED -> false; 
        };
    }

    // Assign Delivery Person
    @Transactional
    public Order assignDeliveryPerson(String orderId, AssignDeliveryPersonRequest request) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getOrderStatus() == OrderStatus.DISPATCHED ||
        	order.getOrderStatus() == OrderStatus.CANCELLED ||
            order.getOrderStatus() == OrderStatus.DELIVERED) {
            throw new RuntimeException("Cannot assign delivery person for dispatched/completed/cancelled orders");
        }

        order.setDeliveryPersonId(request.getDeliveryPersonId());
        order.setUpdatedAt(LocalDateTime.now());

        return orderRepository.save(order);
    }

    public List<Order> getAssignedOrders(String deliveryPersonId) {
        List<Order> orders = orderRepository
            .findByDeliveryPersonIdAndOrderStatusNot(deliveryPersonId, OrderStatus.DELIVERED);

        orders.forEach(o -> o.getOrderItems().size());

        return orders;
    }

    public List<Order> getDeliveredOrders(String deliveryPersonId) {
        List<Order> orders = orderRepository
            .findByDeliveryPersonIdAndOrderStatus(deliveryPersonId, OrderStatus.DELIVERED);

        orders.forEach(o -> o.getOrderItems().size());

        return orders;
    }

}