package com.jewelora.marketplace.orderservice.service;

import java.util.List;

import com.jewelora.marketplace.orderservice.dto.OrderItemRequest;
import com.jewelora.marketplace.orderservice.entity.OrderItem;

public interface OrderItemService {

    void createOrderItems(String orderId, List<OrderItemRequest> items);

    List<OrderItem> getItemsByOrderId(String orderId);
}