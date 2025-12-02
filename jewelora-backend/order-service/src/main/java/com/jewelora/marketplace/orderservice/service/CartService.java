package com.jewelora.marketplace.orderservice.service;

import com.jewelora.marketplace.orderservice.entity.Cart;

public interface CartService {

    Cart getOrCreateCart(String customerId);

    Cart getCartByCustomer(String customerId);

    void clearCart(String cartId);
}