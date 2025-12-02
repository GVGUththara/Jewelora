package com.jewelora.marketplace.orderservice.repository;

import com.jewelora.marketplace.orderservice.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, String> {

    Optional<Cart> findByCustomerId(String customerId);

    boolean existsByCustomerId(String customerId);
}