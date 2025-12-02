package com.jewelora.marketplace.orderservice.impl;

import com.jewelora.marketplace.orderservice.entity.Cart;
import com.jewelora.marketplace.orderservice.entity.CartItem;
import com.jewelora.marketplace.orderservice.repository.CartItemRepository;
import com.jewelora.marketplace.orderservice.repository.CartRepository;
import com.jewelora.marketplace.orderservice.service.CartService;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Override
    public Cart getOrCreateCart(String customerId) {
        return cartRepository.findByCustomerId(customerId)
                .orElseGet(() -> {
                    Cart cart = Cart.builder()
                            .cartId(UUID.randomUUID().toString())
                            .customerId(customerId)
                            .build();
                    return cartRepository.save(cart);
                });
    }

    @Override
    public Cart getCartByCustomer(String customerId) {
        return cartRepository.findByCustomerId(customerId)
                .orElseThrow(() -> new RuntimeException("Cart not found for customer id: " + customerId));
    }

    @Override
    @Transactional
    public void clearCart(String cartId) {
    	List<CartItem> items = cartItemRepository.findByCartId(cartId);
        cartItemRepository.deleteAll(items);
    }
}