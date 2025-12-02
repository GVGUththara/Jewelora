package com.jewelora.marketplace.orderservice.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.jewelora.marketplace.orderservice.entity.OrderItem;
import com.jewelora.marketplace.orderservice.dto.OrderItemRequest;
import com.jewelora.marketplace.orderservice.repository.OrderItemRepository;
import com.jewelora.marketplace.orderservice.service.OrderItemService;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderItemRepository orderItemRepository;

    @Override
    public void createOrderItems(String orderId, List<OrderItemRequest> items) {

        List<OrderItem> orderItems = items.stream().map(i -> {
            BigDecimal discount = i.getProductDiscount() != null ? i.getProductDiscount() : BigDecimal.ZERO;

            BigDecimal discountedAmount = i.getUnitPrice()
                    .multiply(discount)
                    .divide(BigDecimal.valueOf(100));

            BigDecimal finalPrice = i.getUnitPrice()
                    .subtract(discountedAmount)
                    .multiply(BigDecimal.valueOf(i.getQuantity()));

            return OrderItem.builder()
                    .orderItemId(UUID.randomUUID().toString())
                    .orderId(orderId)
                    .productId(i.getProductId())
                    .productName(i.getProductName())
                    .quantity(i.getQuantity())
                    .unitPrice(i.getUnitPrice())
                    .productDiscount(discount)
                    .finalPrice(finalPrice)
                    .build();
        }).toList();

        orderItemRepository.saveAll(orderItems);
    }

    @Override
    public List<OrderItem> getItemsByOrderId(String orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }
}