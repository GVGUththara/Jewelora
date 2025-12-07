package com.jewelora.marketplace.orderservice.repository;

import com.jewelora.marketplace.orderservice.entity.Order;
import com.jewelora.marketplace.orderservice.enums.OrderStatus;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findByCustomerId(String customerId);
    
    List<Order> findByDeliveryPersonId(String deliveryPersonId);
    
    List<Order> findByDeliveryPersonIdAndOrderStatus(String deliveryPersonId, OrderStatus status);

    List<Order> findByDeliveryPersonIdAndOrderStatusNot(String deliveryPersonId, OrderStatus status);

}